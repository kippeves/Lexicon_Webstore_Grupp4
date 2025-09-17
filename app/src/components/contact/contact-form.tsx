"use client";

import { submitContact, ContactFormState } from "@/lib/actions/contact";
import { contactTypes } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function ContactFormClient() {
  const initialState: ContactFormState = {
    success: false,
    errors: {},
    values: {},
  };
  const [state, formAction] = useActionState(submitContact, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Your message has been sent!");
    }
  }, [state.success]);

  const e = (name: string) =>
    state.success ? undefined : state.errors?.[name];

  return (
    <form action={formAction} className="flex flex-col gap-8 flex-1">
      <div className="flex flex-col gap-8 sm:gap-4 sm:flex-row">

        {/* First Name */}
        <div className="flex grow flex-col gap-2">
          <Label htmlFor="firstName" className="font-semibold">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First name"
            defaultValue={state.values?.firstName ?? ""}
            className="text-sm"
          />
          {e("firstName") && (
            <p className="text-red-600 text-sm">{e("firstName")}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex grow flex-col gap-2">
          <Label htmlFor="lastName" className="font-semibold">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            defaultValue={state.values?.lastName ?? ""}
            className="text-sm"
          />
          {e("lastName") && (
            <p className="text-red-600 text-sm">{e("lastName")}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-semibold">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="On what address can we reach you?"
          defaultValue={state.values?.email ?? ""}
          className="text-sm"
        />
        {e("email") && <p className="text-red-600 text-sm">{e("email")}</p>}
      </div>

      {/* Type */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="type" className="font-semibold">
          What is it regarding?
        </Label>
        <Select
          defaultValue={state.values?.type ?? ""}
          onValueChange={(val) => {
            // update hidden input, "hack" to make shadcn select work with zod
            const hidden =
              document.querySelector<HTMLInputElement>("input[name='type']");
            if (hidden) hidden.value = val;
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Type of contact" />
          </SelectTrigger>
          <SelectContent>
            {contactTypes.map((i) => (
              <SelectItem key={i.value} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="type" value={state.values?.type ?? ""} />
        {e("type") && <p className="text-red-600 text-sm">{e("type")}</p>}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="font-semibold">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={10}
          placeholder="What would you like to say?"
          defaultValue={state.values?.message ?? ""}
          className="text-sm"
        />
        {e("message") && <p className="text-red-600 text-sm">{e("message")}</p>}
      </div>
      <Button type="submit" size="lg" className="cursor-pointer">
        Send message
      </Button>
    </form>
  );
}
