const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync, existsSync } = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

// Exercise the real route with an isolated email provider; never send test mail.
function load(filename, send) {
  const output = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const module = { exports: {} };
  const localRequire = (name) => {
    if (name === "resend") return { Resend: class { emails = { send }; } };
    if (name.startsWith("@/")) return load(path.resolve("src", name.slice(2) + ".ts"), send);
    return require(name);
  };
  new Function("require", "module", "exports", output)(localRequire, module, module.exports);
  return module.exports;
}

const valid = { name: "Portfolio Visitor", email: "visitor@example.com", subject: "job", message: "I would like to discuss a frontend engineering opportunity." };

test("contact delivery and validation", async (t) => {
  const previous = { ...process.env };
  let calls = [];
  let result = { data: { id: "test-email" }, error: null };
  const { POST } = load(path.resolve("src/app/api/contact/route.ts"), async (data) => { calls.push(data); return result; });
  const request = (body) => POST(new Request("http://localhost/api/contact", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body) }));
  try {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM_EMAIL;
    await t.test("missing configuration cannot report success", async () => {
      assert.equal((await request(valid)).status, 503);
      assert.equal(calls.length, 0);
    });
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_FROM_EMAIL = "Portfolio <contact@example.com>";
    process.env.CONTACT_EMAIL = "owner@example.com";
    await t.test("invalid fields, subjects, JSON, and honeypot are rejected", async () => {
      for (const body of [{ ...valid, email: "invalid" }, { ...valid, message: "short" }, { ...valid, subject: "unknown" }, { ...valid, website: "spam.example" }, { ...valid, name: "Name\nInjected" }]) {
        assert.equal((await request(body)).status, 422);
      }
      assert.equal((await request("invalid json")).status, 400);
      assert.equal(calls.length, 0);
    });
    await t.test("accepted messages use the configured inbox and visitor reply address, escaping HTML", async () => {
      const response = await request({ ...valid, name: '<b>Visitor</b>', message: '<script>alert("test")</script> & a work opportunity' });
      assert.equal(response.status, 200);
      assert.equal((await response.json()).ok, true);
      assert.deepEqual(calls[0].to, ["owner@example.com"]);
      assert.equal(calls[0].from, "Portfolio <contact@example.com>");
      assert.equal(calls[0].reply_to, valid.email);
      assert.ok(!calls[0].html.includes("<script>"));
      assert.ok(calls[0].html.includes("&lt;b&gt;Visitor&lt;/b&gt;"));
      assert.ok(calls[0].text.includes('<script>alert("test")</script>'));
    });
    await t.test("provider errors and missing receipts cannot report success", async () => {
      result = { data: null, error: { message: "Rejected" } };
      assert.equal((await request(valid)).status, 500);
      result = { data: null, error: null };
      assert.equal((await request(valid)).status, 500);
    });
    await t.test("provider diagnostics stay in server logs and redact the API key", async () => {
      const originalError = console.error;
      const logs = [];
      console.error = (...args) => logs.push(args);
      try {
        result = { data: null, error: { name: "validation_error", message: `Domain is not verified; credential ${process.env.RESEND_API_KEY}` } };
        const response = await request(valid);
        assert.equal(response.status, 500);
        assert.deepEqual(await response.json(), { error: "Failed to send email" });
        assert.equal(logs[0][1].name, "validation_error");
        assert.ok(logs[0][1].message.includes("Domain is not verified"));
        assert.ok(!JSON.stringify(logs).includes(process.env.RESEND_API_KEY));
      } finally {
        console.error = originalError;
      }
    });
  } finally {
    for (const name of ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_EMAIL"]) {
      if (previous[name] === undefined) delete process.env[name];
      else process.env[name] = previous[name];
    }
  }
});

test("every project screenshot and the resume resolve to real public assets", () => {
  const { projects } = load(path.resolve("src/data/projects.ts"));
  for (const project of projects) {
    assert.ok(project.images.length > 0, project.title);
    for (const image of project.images) assert.ok(existsSync(path.join("public", image.src)), image.src);
  }
  assert.equal(readFileSync("public/Muideen Muhammed Jamiu_Senior_Frontend_Engineer_CV.pdf").subarray(0, 5).toString(), "%PDF-");
});
