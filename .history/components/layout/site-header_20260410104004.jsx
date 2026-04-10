import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import Navbar from "@/components/Navbar";

export default function SiteHeader({ navLinks, companyProfile }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group relative rounded-lg focus:outline-none"
          aria-label="Larkosis Pharma Home"
        >
          <Image
            src="/larko.png"
            alt="Larkosis Pharma Logo"
            width={340}
            height={240}
            priority
            className="h-1 w-auto origin-left scale-140 object-contain sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Navbar navLinks={navLinks} companyProfile={companyProfile} />
          <a
            href={`mailto:${companyProfile.email}`}
            className="rounded-md bg-[#ec671f] px-3 py-1.5 text-xs font-semibold text-white"
          >
            Get Quote
          </a>
        </nav>

        <MobileMenu navLinks={navLinks} />
      </div>
    </header>
  );
}
