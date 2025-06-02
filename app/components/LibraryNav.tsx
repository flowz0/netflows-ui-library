"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LibraryNav() {
  const pathname = usePathname();

  return (
    <nav className="h-24 px-8 flex items-center">
      <ul className="flex items-center gap-6">
        <li>
          <Link
            href="/"
            className="text-2xl font-semibold"
          >
            Netflows
          </Link>
        </li>
        <li>
          <Link
            href="/date-picker"
            className={`text-neutral-100 py-2 px-4 rounded-md ${
              pathname === "/date-picker" ? "bg-sky-700 cursor-not-allowed" : "bg-neutral-700 cursor-pointer hover:opacity-80"
            }`}
          >
            Date Picker
          </Link>
        </li>
      </ul>
    </nav>
  );
}