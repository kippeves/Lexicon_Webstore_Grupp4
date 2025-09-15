import Image from "next/image";
import React from "react";
import { linkIcon } from "../footer";

export function FooterIcon({ icon }: { icon: linkIcon }) {
  return (
    <a className="flex items-center" href="#">
      <span className="sr-only">{icon.name}</span>
      <Image
        alt=""
        width={icon.width}
        height={icon.height}
        src={`/icons/${icon.name.toLowerCase()}.svg`}
      />
    </a>
  );
}
