"use client";

import * as React from "react";
import { Toaster } from "sonner";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      {children}
      <DynamicToaster />
    </NextThemesProvider>
  );
}

function DynamicToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      richColors
      position="bottom-right"
      theme={theme as "light" | "dark" | "system"}
    />
  );
}
