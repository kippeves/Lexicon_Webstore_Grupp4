"use server";

import { contactSchema } from "@/lib/validations/contact"; 

export type ContactFormState =
  | { success: false; errors: Record<string, string>; values: Record<string, string> }
  | { success: true; errors?: undefined; values: Record<string, string> };

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const path = issue.path[0];
      if (typeof path === "string") fieldErrors[path] = issue.message;
    });

    return { success: false, errors: fieldErrors, values: raw };
  }
  
  return { success: true, values: {} };
}