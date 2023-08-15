"use client";
import React from "react";
import { MainProvider } from "./context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MainProvider>{children}</MainProvider>;
}
