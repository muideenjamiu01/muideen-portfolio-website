import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema, escapeHtml } from "@/lib/contact";
import { SITE_CONFIG } from "@/lib/constants";

const SUBJECT_LABELS: Record<string, string> = {
  job: "Job Opportunity",
  freelance: "Freelance Project",
  collaboration: "Collaboration",
  other: "Other",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    if (data.website) {
      return NextResponse.json({ error: "Unable to send message" }, { status: 422 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || SITE_CONFIG.email;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      console.warn("[contact] Email delivery is not configured");
      return NextResponse.json(
        { error: "The contact form is temporarily unavailable. Please email me directly." },
        { status: 503 }
      );
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const subjectLabel = SUBJECT_LABELS[data.subject] ?? data.subject;
    const safe = { name: escapeHtml(data.name), email: escapeHtml(data.email), message: escapeHtml(data.message) };

    const { data: sent, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `[Portfolio] ${subjectLabel} from ${data.name}`,
      text: `From: ${data.name} <${data.email}>\nSubject: ${subjectLabel}\n\n${data.message}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Contact</title></head>
<body style="font-family:system-ui,sans-serif;background:#0a0a0f;color:#f8fafc;padding:32px;max-width:600px;margin:0 auto">
  <div style="background:#111118;border:1px solid #1e2030;border-radius:16px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#6366f1,#818cf8);padding:24px 32px">
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#fff">New Portfolio Message</h1>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:14px">${subjectLabel}</p>
    </div>
    <div style="padding:32px">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:8px 0;color:#94a3b8;font-size:13px;width:80px">From</td>
          <td style="padding:8px 0;color:#f8fafc;font-size:14px;font-weight:600">${safe.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;font-size:13px">Email</td>
          <td style="padding:8px 0"><a href="mailto:${safe.email}" style="color:#818cf8;text-decoration:none">${safe.email}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;font-size:13px">Subject</td>
          <td style="padding:8px 0;color:#f8fafc;font-size:14px">${subjectLabel}</td>
        </tr>
      </table>
      <div style="margin-top:24px;padding:16px;background:#1a1a26;border-radius:12px;border:1px solid #1e2030">
        <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:0.05em">Message</p>
        <p style="margin:0;color:#f8fafc;font-size:14px;line-height:1.7;white-space:pre-wrap">${safe.message}</p>
      </div>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #1e2030">
        <a href="mailto:${safe.email}" style="display:inline-flex;align-items:center;gap:8px;background:#6366f1;color:#fff;padding:10px 20px;border-radius:10px;text-decoration:none;font-size:14px;font-weight:600">
          Reply to ${safe.name}
        </a>
      </div>
    </div>
  </div>
  <p style="text-align:center;color:#475569;font-size:12px;margin-top:24px">Sent from ${SITE_CONFIG.url} contact form</p>
</body>
</html>
      `.trim(),
    });

    if (error || !sent?.id) {
      console.error("[contact] Resend delivery failed", {
        name: error?.name ?? "missing_delivery_receipt",
        message: error?.message
          .split(apiKey).join("[redacted]")
          .replace(/re_[A-Za-z0-9_-]+/g, "[redacted]")
          ?? "Resend did not return an email ID",
      });
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", issues: err.issues },
        { status: 422 }
      );
    }
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
