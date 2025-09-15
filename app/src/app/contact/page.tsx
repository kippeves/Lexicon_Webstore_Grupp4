import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webshop - Contact Us",
  description: "Reach out to us!",
};

export default async function ContactPage() {
  async function purgeData(data: FormData) {
    "use server";
    const form = Object.fromEntries(data);
    console.dir(form, { depth: null });
  }

  const contactTypes: { value: string; label: string }[] = [
    { value: "support", label: "Support" },
    { value: "info", label: "Information" },
    { value: "complaints", label: "Complaints" },
  ];

  return (
    <div className="flex flex-col gap-4 py-4">
      <h2 className="text-3xl">Contact</h2>
      <div className="flex flex-col gap-2">
        <div className="text-justify w-1/2 flex flex-col gap-4">
          <p>
            We would like to hear from you if you have any questions or rights
            to obtain assistance. We are a company that produces and distributes
            products, and we have a team of professional personnel to handle
            your needs.
          </p>
          <p>
            What types of questions can you have? Why not send us an email or
            ring in if you have any specific questions or rights? We&apos;re
            here to help and assist you in meeting your requirements.
          </p>
        </div>
      </div>
      <form
        action={purgeData}
        className="flex flex-col gap-4 w-1/2 border-t-2 rounded py-8"
      >
        <h3 className="text-3xl pb-4">Contact Us</h3>
        <div>
          <Label htmlFor="type" className="pb-2">
            What is it regarding?
          </Label>
          <Select name="type" required>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type of contact" />
            </SelectTrigger>
            <SelectContent>
              {contactTypes.map((i) => (
                <SelectItem key={i.value + i.label} value={i.value}>
                  {i.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="email" className="pb-2">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="On what adress can we reach you?"
          />
        </div>
        <div>
          <Label htmlFor="email" className="pb-2">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={15}
            required
            placeholder="What would you like to say?"
          />
        </div>
        <div className="flex grow justify-start">
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
}
