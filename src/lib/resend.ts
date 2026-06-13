import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadNotification(lead: {
  name: string;
  phone: string;
  email?: string | null;
  serviceType: string;
  postcode: string;
  message?: string | null;
  preferredDate?: Date | null;
}) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `New Lead: ${lead.name} - ${lead.serviceType}`,
      html: `<div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0F172A; border-bottom: 2px solid #06B6D4; padding-bottom: 8px;">New Lead Submission</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Email:</strong> ${lead.email || "Not provided"}</p>
        <p><strong>Service:</strong> ${lead.serviceType}</p>
        <p><strong>Postcode:</strong> ${lead.postcode}</p>
        <p><strong>Message:</strong> ${lead.message || "None"}</p>
        <p><strong>Date:</strong> ${lead.preferredDate ? new Date(lead.preferredDate).toLocaleString() : "Not specified"}</p>
      </div>`,
    });
    return { success: true };
  } catch (error) {
    console.error("Email failed:", error);
    return { success: false, error };
  }
}
