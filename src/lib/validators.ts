import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
});

export const leadSubmissionSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  email: z.string().email().optional().or(z.literal("")),
  serviceType: z.enum([
    "Emergency Plumbing",
    "Residential Plumbing",
    "Commercial Plumbing",
    "Heating & Gas",
    "Drainage",
    "Other",
  ]),
  postcode: z.string().min(3).max(10),
  message: z.string().max(1000).optional(),
  preferredDate: z.string().datetime().optional().or(z.literal("")),
});

export const leadUpdateSchema = z.object({
  status: z
    .enum(["new", "contacted", "scheduled", "in_progress", "completed", "lost"])
    .optional(),
  priority: z.enum(["low", "normal", "high", "urgent"]).optional(),
  assignedTo: z.number().optional().nullable(),
  note: z.string().optional(),
});

export const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["admin", "manager", "staff"]),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
});

export const updateUserSchema = z.object({
  role: z.enum(["admin", "manager", "staff"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
});
