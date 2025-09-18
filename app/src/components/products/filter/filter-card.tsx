import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export default function FilterCard({
  id,
  title,
  children,
  className,
  ...props
}: { title: string } & React.ComponentProps<"div">) {
  return (
    <AccordionItem
      value={id!}
      className={`${className} bg-white gap-2 border-0 px-2 py-0 rounded shadow-none`}
      {...props}
    >
      <AccordionTrigger className="px-2 font-bold">{title}</AccordionTrigger>
      <AccordionContent className="px-2 pb-3">{children}</AccordionContent>
    </AccordionItem>
  );
}
