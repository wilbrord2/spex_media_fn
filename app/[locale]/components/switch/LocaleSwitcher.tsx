"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import LanguageSwicher from "./languageSwicher";

export type LanguageDropDownListType = {
  label: string;
  icon?: StaticImageData;
};

const Languages: LanguageDropDownListType[] = [
  { icon: undefined, label: "English" },
  { icon: undefined, label: "French" },
];

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [selected, setSelected] = useState<LanguageDropDownListType>(
    Languages.find((l) =>
      locale === "fr" ? l.label === "French" : l.label === "English"
    ) || Languages[0]
  );

  useEffect(() => {
    const newLocale = selected.label === "English" ? "en" : "fr";
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  }, [selected, locale, pathname, router]);

  return (
    <section className="w-full">
      <LanguageSwicher
        items={Languages}
        selected={selected}
        setSelected={setSelected}
      />
    </section>
  );
}
