"use client";


import React, { useState } from "react";
import Mode from "./Mode";
import {Menu} from "lucide-react"
import Link from "next/link";


interface link {
    label : string,
    to : string
}

const Links : link[] = [
    { label: "Sound", to: "/sound" },
    // { label: "Products", to: "#products" },
    // { label: "Pricing", to: "#pricing" },
    // { label: "Docs", to: "#docs" },
]

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-900/70 dark:supports-[backdrop-filter]:bg-neutral-900/60">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top Navigation">
        {/* Top row */}
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-10 w-fit p-5 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold">Utils</span>
            </Link>
          </div>

          {/* Center: Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {Links.map((link) => (
              <Link
                key={link.label}
                href={link.to}
                className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-5">
                <Mode/>
            </div>
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-700 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <span className="sr-only">Toggle navigation</span>
              <Menu/>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          id="mobile-menu"
          className={`md:hidden origin-top overflow-hidden transition-all duration-200 ease-out ${
            open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 py-3">


                <div className="w-full">
                  <Mode/>
                </div>
            <div className={`grid grid-cols-2 gap-2 ${Links.length == 1 ? "sm:grid-cols-1" : "sm:grid-cols-4"}`}>
              {Links.map((link) => (
                <Link
                  key={link.label}
                  href={link.to}
                  className={`rounded-xl ${Links.length == 1 ? "col-span-full" : ""} bg-neutral-50 px-4 py-3 text-center text-sm font-medium text-neutral-800 ring-1 ring-inset ring-neutral-200 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:bg-neutral-800 dark:text-neutral-100 dark:ring-neutral-700 dark:hover:bg-neutral-700`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}