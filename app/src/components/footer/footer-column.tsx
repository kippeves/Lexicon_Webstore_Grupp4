import React from "react";
import { content } from "../footer";

export function FooterColumn({
  header,
  content,
}: {
  header: string;
  content: content[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">{header}</h2>
      <ol>
        {content.map((item) => (
          <li key={item.slug + item.name}>
            <a
              href={item.slug}
              className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-all"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
