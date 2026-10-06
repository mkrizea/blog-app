"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href
      ? "text-blue-700 font-medium"
      : "text-stone-600 hover:text-stone-900";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-stone-900">
            My Blog App
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className={linkClass("/")}>
              Posts
            </Link>
            <Link
              href="/create-blog"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              New post
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-stone-800 hover:bg-stone-100 md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-stone-200 bg-white px-4 py-3 md:hidden">
          <Link
            href="/"
            className="block rounded-md px-2 py-2 text-stone-800 hover:bg-stone-100"
            onClick={() => setIsOpen(false)}
          >
            Posts
          </Link>
          <Link
            href="/create-blog"
            className="mt-1 block rounded-md bg-blue-600 px-2 py-2 text-center font-medium text-white hover:bg-blue-700"
            onClick={() => setIsOpen(false)}
          >
            New post
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
