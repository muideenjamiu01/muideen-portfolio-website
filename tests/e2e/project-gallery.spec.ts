import { test, expect } from "@playwright/test";

const project = "Institutional Management System";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.locator("#projects").evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
  await expect(page.getByRole("button", { name: "Switch to light mode" }).first()).toBeVisible();
});

test("preview stays on-page, traps focus, navigates, and restores scroll and focus", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const trigger = page.getByRole("button", { name: `Preview ${project} images` });
  await trigger.scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => ({ url: location.href, scroll: scrollY }));
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: project });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close image preview" })).toBeFocused();
  await expect(page.locator("body")).toHaveCSS("position", "fixed");
  await page.keyboard.press("ArrowRight");
  await expect(dialog.locator(".preview-canvas img")).toHaveAttribute("alt", "Admin dashboard");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.locator(".preview-canvas img")).toHaveAttribute("alt", "Applicant registration");
  await dialog.getByRole("button", { name: "Preview image 3:", exact: false }).click();
  await expect(dialog.locator(".preview-canvas img")).toHaveAttribute("alt", "Admin course management");
  const last = dialog.getByRole("button", { name: "Preview image 6:", exact: false });
  await last.focus();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "View image at full width" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(last).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("position", "fixed");
  expect(await page.evaluate(() => location.href)).toBe(before.url);
  expect(Math.abs((await page.evaluate(() => scrollY)) - before.scroll)).toBeLessThan(3);
  expect(page.context().pages()).toHaveLength(1);
  expect(errors).toEqual([]);
});

test("long screenshots can be read at full width and closing by backdrop works", async ({ page }) => {
  await page.getByRole("button", { name: "Preview Quiz Fun images" }).click();
  const dialog = page.getByRole("dialog", { name: "Quiz Fun" });
  await dialog.locator(".preview-canvas img").evaluate((img) => (img as HTMLImageElement).decode());
  await dialog.getByRole("button", { name: "View image at full width" }).click();
  await expect(dialog.getByRole("button", { name: "Fit image to screen" })).toHaveAttribute("aria-pressed", "true");
  expect(await dialog.locator(".preview-canvas").evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
  await dialog.locator(".preview-canvas").evaluate((element) => { element.scrollTop = 600; });
  await dialog.getByRole("button", { name: "Next image", exact: true }).click();
  await expect.poll(() => dialog.locator(".preview-canvas").evaluate((element) => element.scrollTop)).toBe(0);
  await page.mouse.click(4, 4);
  await expect(dialog).toHaveCount(0);
});

test("filters reveal all matches and single-image projects preview in both themes", async ({ page }) => {
  await page.getByRole("button", { name: "Landing Pages", exact: true }).click();
  await expect(page.locator("#project-grid article")).toHaveCount(2);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page.getByRole("button", { name: "View all 12 projects" }).click();
  await expect(page.locator("#project-grid article")).toHaveCount(12);
  await page.getByRole("button", { name: "Preview TestAssessify images" }).click();
  const dialog = page.getByRole("dialog", { name: "TestAssessify" });
  await expect(dialog.getByRole("button", { name: "Next image", exact: true })).toHaveCount(0);
  await dialog.getByRole("button", { name: "Close image preview" }).click();
  await page.getByRole("button", { name: "Switch to light mode" }).first().click();
  await page.getByRole("button", { name: "Preview TestAssessify images" }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await expect(dialog).toBeVisible();
  await dialog.locator(".preview-canvas img").evaluate((img) => (img as HTMLImageElement).decode());
  await page.screenshot({ path: "/tmp/portfolio-preview-light.png" });
});

test("image failures show a fallback and navigation still works", async ({ page }) => {
  await page.route("**/projects/institution-management-system-vercel-app-2026-08-08-21_55_30.png", (route) => route.abort());
  await page.getByRole("button", { name: `Preview ${project} images` }).click();
  const dialog = page.getByRole("dialog", { name: project });
  await expect(dialog.getByRole("alert")).toContainText("couldn’t load");
  await dialog.getByRole("button", { name: "Next image", exact: true }).click();
  await dialog.locator(".preview-canvas img").evaluate((img) => (img as HTMLImageElement).decode());
  await expect(dialog.getByRole("alert")).toHaveCount(0);
});

test("mobile previews support swipe, fit the viewport, and preserve the selected slide", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const gallery = page.getByRole("region", { name: `${project} screenshots` });
  await gallery.getByRole("button", { name: `Next screenshot of ${project}`, exact: true }).click();
  await gallery.getByRole("button", { name: `Preview ${project} images` }).click();
  const dialog = page.getByRole("dialog", { name: project });
  await expect(dialog.locator(".preview-canvas img")).toHaveAttribute("alt", "Admin dashboard");
  const canvas = dialog.locator(".preview-canvas");
  await canvas.dispatchEvent("touchstart", { touches: [{ identifier: 0, clientX: 300, clientY: 200 }] });
  await canvas.dispatchEvent("touchend", { changedTouches: [{ identifier: 0, clientX: 90, clientY: 205 }] });
  await expect(canvas.locator("img")).toHaveAttribute("alt", "Admin course management");
  await canvas.locator("img").evaluate((img) => (img as HTMLImageElement).decode());
  const bounds = await dialog.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(844);
  await page.screenshot({ path: "/tmp/portfolio-preview-mobile.png" });
  await dialog.getByRole("button", { name: "Close image preview" }).click();
  await expect(gallery.locator("img")).toHaveAttribute("alt", "Admin course management");
});

test("desktop showcase renders images without leaving the section", async ({ page }) => {
  await page.locator("#projects img").first().evaluate((img) => (img as HTMLImageElement).decode());
  await page.screenshot({ path: "/tmp/portfolio-projects-redesign.png" });
  await page.getByRole("button", { name: `Preview ${project} images` }).click();
  const dialog = page.getByRole("dialog", { name: project });
  await dialog.getByRole("button", { name: "Preview image 2:", exact: false }).click();
  await dialog.locator(".preview-canvas img").evaluate((img) => (img as HTMLImageElement).decode());
  for (const thumbnail of await dialog.locator('button img').all()) {
    await thumbnail.evaluate((img) => (img as HTMLImageElement).decode());
  }
  await page.screenshot({ path: "/tmp/portfolio-preview-desktop.png" });
});
