import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  // Check seed key
  const seedKey = request.headers.get("x-seed-key");
  if (seedKey !== process.env.SEED_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if users table exists by trying a count
    let existingCount = 0;
    try {
      existingCount = await prisma.user.count();
    } catch {
      // Table doesn't exist yet — try to create via prisma db push logic
      return NextResponse.json(
        {
          error:
            "Database tables not found. Please make sure the DATABASE_URL is correct and redeploy. The build should auto-create tables via 'prisma migrate deploy'.",
        },
        { status: 500 }
      );
    }

    if (existingCount > 0) {
      return NextResponse.json(
        {
          success: true,
          message: "Database already seeded",
          credentials: {
            admin: {
              email: "admin@quickfixplumbingbristol.co.uk",
              password: "QuickFix2024!",
            },
            manager: {
              email: "manager@quickfixplumbingbristol.co.uk",
              password: "Manager2024!",
            },
            staff: {
              email: "staff@quickfixplumbingbristol.co.uk",
              password: "Staff2024!",
            },
          },
        },
        { status: 200 }
      );
    }

    // Clear existing data (should be empty but just in case)
    await prisma.leadAssignment.deleteMany();
    await prisma.leadNote.deleteMany();
    await prisma.activityLog.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.user.deleteMany();

    // Create users
    const adminPassword = await bcrypt.hash("QuickFix2024!", 12);
    const managerPassword = await bcrypt.hash("Manager2024!", 12);
    const staffPassword = await bcrypt.hash("Staff2024!", 12);

    const admin = await prisma.user.create({
      data: {
        email: "admin@quickfixplumbingbristol.co.uk",
        passwordHash: adminPassword,
        name: "John Smith",
        role: "admin",
        status: "active",
      },
    });

    const manager = await prisma.user.create({
      data: {
        email: "manager@quickfixplumbingbristol.co.uk",
        passwordHash: managerPassword,
        name: "Sarah Williams",
        role: "manager",
        status: "active",
      },
    });

    const staff = await prisma.user.create({
      data: {
        email: "staff@quickfixplumbingbristol.co.uk",
        passwordHash: staffPassword,
        name: "Mike Davies",
        role: "staff",
        status: "active",
      },
    });

    // Create sample leads
    const leadsData = [
      {
        name: "Sarah Mitchell",
        phone: "07712 345678",
        email: "sarah@email.com",
        serviceType: "Emergency Plumbing",
        postcode: "BS8 1QU",
        message: "Burst pipe under kitchen sink",
        status: "new",
        priority: "urgent" as const,
      },
      {
        name: "James Thompson",
        phone: "07723 456789",
        email: "james@email.com",
        serviceType: "Heating & Gas",
        postcode: "BS1 2NA",
        message: "Boiler not firing up",
        status: "contacted",
        priority: "high" as const,
        assignedTo: manager.id,
      },
      {
        name: "Emily Parker",
        phone: "07734 567890",
        email: "emily@email.com",
        serviceType: "Residential Plumbing",
        postcode: "BS6 5QJ",
        message: "Bathroom renovation quote",
        status: "scheduled",
        priority: "normal" as const,
        assignedTo: staff.id,
      },
      {
        name: "David Harris",
        phone: "07745 678901",
        email: "david@email.com",
        serviceType: "Drainage",
        postcode: "BS4 2DQ",
        message: "Blocked drain in garden",
        status: "in_progress",
        priority: "high" as const,
        assignedTo: manager.id,
      },
      {
        name: "Lisa Clarke",
        phone: "07756 789012",
        email: "lisa@email.com",
        serviceType: "Heating & Gas",
        postcode: "BS3 1AA",
        message: "Need CP12 certificate",
        status: "new",
        priority: "normal" as const,
      },
      {
        name: "Robert Wilson",
        phone: "07767 890123",
        email: "robert@email.com",
        serviceType: "Residential Plumbing",
        postcode: "BS7 8NP",
        message: "Water stain on ceiling",
        status: "scheduled",
        priority: "high" as const,
        assignedTo: staff.id,
      },
      {
        name: "Anna Foster",
        phone: "07778 901234",
        email: "anna@email.com",
        serviceType: "Residential Plumbing",
        postcode: "BS2 0HG",
        message: "Kitchen tap dripping",
        status: "contacted",
        priority: "low" as const,
        assignedTo: manager.id,
      },
      {
        name: "Michael Baker",
        phone: "07789 012345",
        email: "michael@email.com",
        serviceType: "Commercial Plumbing",
        postcode: "BS1 4DJ",
        message: "Restaurant kitchen sink install",
        status: "new",
        priority: "normal" as const,
      },
      {
        name: "Jennifer Adams",
        phone: "07790 123456",
        email: "jen@email.com",
        serviceType: "Residential Plumbing",
        postcode: "BS5 0TE",
        message: "Toilet not flushing",
        status: "completed",
        priority: "normal" as const,
        assignedTo: staff.id,
      },
      {
        name: "Chris Williams",
        phone: "07801 234567",
        email: "chris@email.com",
        serviceType: "Emergency Plumbing",
        postcode: "BS8 4QN",
        message: "Overflowing toilet",
        status: "in_progress",
        priority: "urgent" as const,
        assignedTo: manager.id,
      },
    ];

    for (const leadData of leadsData) {
      await prisma.lead.create({
        data: {
          ...leadData,
          source: "website",
          createdAt: new Date(
            Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
          ),
        },
      });
    }

    // Create activity logs
    await prisma.activityLog.createMany({
      data: [
        {
          userId: admin.id,
          action: "seeded database",
          entityType: "system",
          details: { message: "Database seeded with sample data" } as any,
        },
        {
          userId: manager.id,
          action: "assigned lead",
          entityType: "lead",
          details: { message: "Assigned Lead #2 to Sarah Williams" } as any,
        },
        {
          userId: manager.id,
          action: "changed status",
          entityType: "lead",
          details: { message: "Status changed: New to Contacted" } as any,
        },
        {
          userId: admin.id,
          action: "created user",
          entityType: "user",
          details: { message: "Added Mike Davies as Staff" } as any,
        },
        {
          userId: staff.id,
          action: "completed lead",
          entityType: "lead",
          details: { message: "Completed toilet repair" } as any,
        },
        {
          userId: manager.id,
          action: "added note",
          entityType: "lead",
          details: { message: "Customer confirmed appointment" } as any,
        },
      ],
    });

    return NextResponse.json(
      {
        success: true,
        credentials: {
          admin: {
            email: admin.email,
            password: "QuickFix2024!",
          },
          manager: {
            email: manager.email,
            password: "Manager2024!",
          },
          staff: {
            email: staff.email,
            password: "Staff2024!",
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        error: "Seed failed. Make sure your DATABASE_URL is correct.",
        hint: "Check that your Neon PostgreSQL connection string is valid and the database is accessible.",
      },
      { status: 500 }
    );
  }
}
