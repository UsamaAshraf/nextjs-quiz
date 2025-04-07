"use client";

import "../../styles/globals.css";
import React from "react";

import Link from "next/link";

import { APP_ROUTES } from "../../routes";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex bg-gray-100 items-center justify-center p-4 w-full">
      <div className="fixed top-0 left-0 w-26 h-screen bg-white text-black">
        <div className="flex justify-center items-center py-4">
          <h2 className="text-bg font-semibold">Samwell</h2>
        </div>
        <nav className="flex flex-col space-y-4 px-4 py-6">
          <Link href={APP_ROUTES.HOME_PAGE} className="hover:bg-gray-100 p-2 rounded">
            Home
          </Link>
          <Link href="/about" className="hover:bg-gray-100 p-2 rounded">
            About
          </Link>
        </nav>
      </div>
      <div className="w-full p-8">{children}</div>
    </main>
  );
}
