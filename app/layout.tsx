"use client";

import "../styles/globals.css";
import React from "react";
import { AppProvider } from "../context/AppContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900">
        <AppProvider>
          <main className="w-full flex items-center justify-center">{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
