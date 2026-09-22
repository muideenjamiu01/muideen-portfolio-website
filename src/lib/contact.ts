import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100).regex(/^[^\r\n]+$/, "Enter your name on one line"),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  subject: z.enum(["job", "freelance", "collaboration", "other"], { errorMap: () => ({ message: "Please select a subject" }) }),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(2000, "Message is too long"),
  website: z.string().max(200).optional(),
});

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}
