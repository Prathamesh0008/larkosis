"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ navLinks, companyProfile }) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-1 md:flex">
      {navLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);

        return (
         <Link
  key={link.href}
  href={link.href}
  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all
    ${
      isActive
        ? "bg-[#ec671f] text-white border border-[#ec671f]"
        : "text-black hover:text-[#ec671f]"
    }`}
>
  {link.label}
</Link>
        );
      })}

    
    </nav>
  );
}