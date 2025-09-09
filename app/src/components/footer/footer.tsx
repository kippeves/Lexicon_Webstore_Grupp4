import React from "react";
import {
  categories,
  circleIcon,
  colorIcon,
  company,
  help,
  partner,
} from "./data";
import { FooterIcon } from "./FooterIcon";
import { FooterColumn } from "./FooterColumn";

function Footer() {
  return (
    <div className="flex flex-col grow full-width border-t-1">
      <div className="flex-row border-b-1">
        <div className="flex py-6 px-4 justify-evenly">
          <div className="flex flex-col gap-5 py-4 grow">
            <h2 className="text-2xl font-bold uppercase">Grupp 4 Webstore</h2>
            <p className="flex flex-col">
              <span className="uppercase">Hotline 24/7</span>
              <span className="text-3xl font-bold text-green-800">
                <a className="hover:underline" href="tel:04681234567">
                  (046) 8123 45 67
                </a>
              </span>
            </p>
            <p className="flex flex-col gap-0 text-sm">
              <span>Placeholdergatan 2</span>
              <span>123 45, Stockholm</span>
              <a className="hover:underline" href="mailto:testkontakt@test.se">
                testkontakt@test.se
              </a>
            </p>
            <div className="flex gap-3">
              {circleIcon.map((icon) => (
                <FooterIcon key={icon.name} icon={icon} />
              ))}
            </div>
          </div>
          <nav className="gap-15 p-4 flex">
            <FooterColumn header="Kategorier" content={categories} />
            <FooterColumn header="Företag" content={company} />
            <FooterColumn header="Hjälp" content={help} />
            <FooterColumn header="Partner" content={partner} />
          </nav>
        </div>
      </div>
      <div className="flex py-6">
        <p className="text-sm">
          © 2025 <span className="font-bold">Grupp 4</span>. Alla rätter
          reserverade
        </p>
        <div className="flex gap-4 items-center justify-center w-1/2">
          {colorIcon.map((item) => (
            <FooterIcon key={item.name} icon={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Footer;
