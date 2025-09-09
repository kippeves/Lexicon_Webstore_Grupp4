import React from "react";
import { content } from "./types";

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
            <a href={item.slug}>{item.name}</a>
          </li>
        ))}
      </ol>
    </div>
  );
}
