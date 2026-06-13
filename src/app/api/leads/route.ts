import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSubmissionSchema } from "@/lib/validators";
import { isRateLimited } from "@/lib/rate-limit";
import { sendLeadNotification } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

    if (isRateLimited(ip, 3, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = leadSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: (parsed.error as any).issues || parsed.error.message },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        serviceType: data.serviceType,
        postcode: data.postcode,
        message: data.message || null,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        ipAddress: ip,
        status: "new",
        priority: data.serviceType === "Emergency Plumbing" ? "urgent" : "normal",
        source: "website",
      },
    });

    // Send email notification
    await sendLeadNotification({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      serviceType: lead.serviceType,
      postcode: lead.postcode,
      message: lead.message,
      preferredDate: lead.preferredDate,
    });

    return NextResponse.json({ leadId: lead.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
