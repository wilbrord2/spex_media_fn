import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import ContextProvider from "./context";
import { FiLoader } from "react-icons/fi";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <FiLoader className="animate-spin text-primary" size={32} />
          </div>
        }
      >
        <ContextProvider>{children}</ContextProvider>
      </Suspense>
    </NextIntlClientProvider>
  );
}
