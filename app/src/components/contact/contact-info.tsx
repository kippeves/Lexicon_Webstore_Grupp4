import { ReactNode } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const contactInfoArr = [
  {
    icon: <Mail size={20} />,
    title: "Chat to us",
    description: "Our friendly team is here to help.",
    link: { href: "mailto:testkontakt@test.se", label: "testkontakt@test.se" },
  },
  {
    icon: <Phone size={20} />,
    title: "Call us",
    description: "Mon-Fri from 8am to 5pm.",
    link: { href: "tel:04681234567", label: "(046) 8123 45 67" },
  },
  {
    icon: <MapPin size={20} />,
    title: "Visit us",
    description: "Come say hello at our office HQ.",
    link: {
      href: "",
      label: "Placeholdergatan 2, 123 45 Stockholm",
    },
  },
];

export default function ContactInfo() {
  return (
    <div className="flex-1 flex flex-col gap-8 md:items-center">
      {contactInfoArr.map((card, index) => (
        <ContactInfoSection key={index} {...card} />
      ))}
    </div>
  );
}

interface ContactInfoSectionProps {
  icon: ReactNode;
  title: string;
  description: string;
  link?: { href: string; label: string };
}

function ContactInfoSection({
  icon,
  title,
  description,
  link,
}: ContactInfoSectionProps) {
  return (
    <div className="flex items-start gap-4 md:min-w-80">
      <div className="border-2 border-muted rounded p-2">{icon}</div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        {link && (
          <a
            className="text-sm mt-2 font-medium hover:underline"
            href={link.href}
          >
            {link.label}
          </a>
        )}
      </div>
    </div>
  );
}
