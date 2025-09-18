import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";

export default function FilterCard({
  title,
  children,
  className,
  ...props
}: { title: string } & React.ComponentProps<"div">) {
  return (
    <Card
      className={`${className} gap-2 border-0 p-3 rounded-none shadow-none`}
      {...props}
    >
      <CardTitle className="font-bold py-2">{title}</CardTitle>
      <CardContent className="p-0">
        <div className="flex flex-col gap-1 px-2">{children}</div>
      </CardContent>
    </Card>
  );
}
