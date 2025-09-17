import { z } from "zod";
import { contactTypeValues } from "@/lib/types";

export const contactSchema = z.object({
  firstName: z
    .string({ error: "First name is required" })
    .min(2, { error: "First name must be at least 2 characters" })
    .max(50, { error: "First name is too long" }),
  lastName: z
    .string({ error: "Last name is required" })
    .min(2, { error: "Last name must be at least 2 characters" })
    .max(50, { error: "Last name is too long" }),
  email: z.email({
    error: "Please enter a valid email address",
  }),
  type: z.enum(contactTypeValues, {
    error: "Please select a type",
  }),
  message: z
    .string({
      error: "Message is required",
    })
    .min(10, { error: "Message must be at least 10 characters" })
    .max(1000, { error: "Message is too long" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
