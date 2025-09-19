import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export default function FilterCard({
  id,
  title,
  open,
  children,
  className,
  ...props
}: { title: string, open?: boolean } & React.ComponentProps<"div">) {
  return (
    <Accordion id={id} type="single" collapsible={true} className="flex flex-col gap-1" defaultValue={(open && id) ? id : ""}>
      <AccordionItem
        value={id!}
        className={`${className}`}
        {...props}
      >
        <AccordionTrigger className="px-2 font-bold">{title}</AccordionTrigger>
        <AccordionContent className="px-1">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
