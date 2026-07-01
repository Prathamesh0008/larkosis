"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getAllProducts } from "@/lib/catalog";
import { getAllActiveIngredients } from "@/lib/ingredients";

function SearchIcon(props) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.2}
        d="m21 21-4.35-4.35m1.6-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
      />
    </svg>
  );
}

function BarsIcon(props) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

function ChevronDownIcon({ className = "" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export default function Navbar({ companyProfile }) {
  const [ingredients] = useState(() => getAllActiveIngredients());
  const [showSearch, setShowSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [productsOpen, setProductsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [products] = useState(() => getAllProducts());
  const [language, setLanguage] = useState("en");

  const router = useRouter();
  const pathname = usePathname();

  const productsRef = useRef(null);
  const resourcesRef = useRef(null);
  const langRef = useRef(null);
  const searchRef = useRef(null);

  const languages = [
    { code: "en", label: "English", flag: "gb" },
    { code: "nl", label: "Dutch", flag: "nl" },
    { code: "es", label: "Spanish", flag: "es" },
    { code: "de", label: "German", flag: "de" },
    { code: "pt", label: "Portuguese", flag: "pt" },
    { code: "fr", label: "French", flag: "fr" },
    { code: "zh", label: "Chinese", flag: "cn" },
    { code: "ja", label: "Japanese", flag: "jp" },
    { code: "ar", label: "Arabic", flag: "sa" },
  ];

  const currentLang = languages.find((item) => item.code === language) || languages[0];

  const isIngredientsPath =
    pathname === "/active-ingredients" || pathname.startsWith("/active-ingredients/");

  const isProductsPath =
    pathname === "/products" || pathname.startsWith("/products/");

  const isOfferingsActive =
    pathname === "/products" ||
    pathname === "/pharmaceutical-products" ||
    pathname === "/test-kits" ||
    pathname === "/active-ingredients" ||
    pathname === "/over-the-counter" ||
    pathname === "/private-label-manufacturing-oem" ||
    pathname.startsWith("/products/") ||
    pathname.startsWith("/pharmaceutical-products/") ||
    pathname.startsWith("/test-kits/") ||
    pathname.startsWith("/active-ingredients/");

  const isResourcesActive =
    pathname === "/contact" || pathname === "/about";

  const activeTopLinkClass =
    "bg-[#e8f6fb] text-[#FF7A00] font-semibold shadow-sm";

  const topLinkClass =
    "cursor-pointer rounded-full px-3 py-2 transition-all duration-300 hover:bg-[#f3f8fb] hover:text-[#0d2d47]";

  const dropdownItemClass =
    "cursor-pointer rounded-md px-4 py-2.5 text-sm transition-colors duration-200";

  const activeDropdownItemClass = "bg-[#e8f6fb] text-[#0d2d47] font-semibold";

  const mobileSubItemClass = (isActive) =>
    `cursor-pointer rounded-lg px-3 py-2 transition-all duration-200 ${
      isActive
        ? "bg-[#e8f6fb] text-[#0d2d47] font-semibold"
        : "hover:bg-gray-50 hover:text-[#0d2d47]"
    }`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setResourcesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLanguages(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.closest(".search-icon")
      ) {
        if (!searchTerm) setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchTerm]);

  const goTo = (path) => {
    setMenuOpen(false);
    setProductsOpen(false);
    setResourcesOpen(false);
    setShowLanguages(false);
    setShowSearch(false);
    setSuggestions([]);

    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectLanguage = (langCode) => {
    setLanguage(langCode);
    setShowLanguages(false);
  };

  const updateSuggestions = (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const query = value.toLowerCase();

    const productMatches = products
      .filter((item) => item.name?.toLowerCase().includes(query))
      .slice(0, 5)
      .map((item) => ({
        type: "product",
        name: item.name,
        slug: item.slug,
      }));

    const ingredientMatches = ingredients
      .filter(
        (item) =>
          item.name?.toLowerCase().includes(query) ||
          item.slug?.toLowerCase().includes(query),
      )
      .slice(0, 5)
      .map((item) => ({
        type: "ingredient",
        name: item.name,
        slug: item.slug,
      }));

    setSuggestions([...productMatches, ...ingredientMatches]);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchTerm.trim().toLowerCase();
    if (!query) return;

    const product = products.find((item) =>
      item.name?.toLowerCase().includes(query),
    );

    if (product) {
      goTo(`/products/${product.slug}`);
      setSearchTerm("");
      return;
    }

    const ingredient = ingredients.find(
      (item) =>
        item.name?.toLowerCase().includes(query) ||
        item.slug?.toLowerCase().includes(query),
    );

    if (ingredient) {
      goTo(`/active-ingredients/${ingredient.slug}`);
      setSearchTerm("");
      return;
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-md backdrop-blur-md">
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4 sm:h-[70px] sm:px-6 xl:px-10 2xl:px-0">
        <Link href="/" className="flex shrink-0 items-center overflow-visible">
          <Image
            src="/larko.png"
            alt="Larkosis Pharma Logo"
            width={240}
            height={80}
            priority
            className="mt-5   h-10 w-auto origin-left scale-[1.55] object-contain sm:h-11 sm:scale-[1.6] lg:h-12 lg:scale-[1.7] xl:h-[52px] xl:scale-[1.75]"
          />
        </Link>

        <ul className="hidden items-center gap-2 text-[15px] font-medium text-gray-800 lg:flex xl:gap-4 xl:text-base">
          <li
            onClick={() => goTo("/")}
            className={`${topLinkClass} ${pathname === "/" ? activeTopLinkClass : ""}`}
          >
            Home
          </li>

          <li
            ref={productsRef}
            onClick={() => setProductsOpen((prev) => !prev)}
            className={`relative ${topLinkClass} ${isOfferingsActive ? activeTopLinkClass : ""}`}
          >
            <span className="inline-flex items-center gap-1.5">
              Our Products
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""}`}
              />
            </span>

            {productsOpen && (
              <ul className="absolute left-0 top-full z-40 mt-3 w-72 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                {[
                  ["/products", "Finished Products", isProductsPath],
                  ["/pharmaceutical-products", "Pharmaceutical Products", pathname === "/pharmaceutical-products" || pathname.startsWith("/pharmaceutical-products/")],
                  ["/active-ingredients", "API / Ingredients", isIngredientsPath],
                  ["/over-the-counter", "OTC", pathname === "/over-the-counter"],
                  ["/private-label-manufacturing-oem", "Private Label Manufacturing / OEM", pathname === "/private-label-manufacturing-oem"],
                  ["/test-kits", "Test Kits", pathname === "/test-kits" || pathname.startsWith("/test-kits/")],
                ].map(([href, label, active]) => (
                  <li
                    key={href}
                    onClick={(event) => {
                      event.stopPropagation();
                      goTo(href);
                    }}
                    className={`${dropdownItemClass} ${active ? activeDropdownItemClass : "text-gray-700 hover:bg-gray-100"}`}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li
            onClick={() => goTo("/about")}
            className={`${topLinkClass} ${pathname === "/about" ? activeTopLinkClass : ""}`}
          >
            About Us
          </li>

          <li
            ref={resourcesRef}
            onClick={() => setResourcesOpen((prev) => !prev)}
            className={`relative ${topLinkClass} ${isResourcesActive ? activeTopLinkClass : ""}`}
          >
            <span className="inline-flex items-center gap-1.5">
              Resources
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
              />
            </span>

            {resourcesOpen && (
              <ul className="absolute left-0 top-full z-40 mt-3 w-64 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                <li
                  onClick={(event) => {
                    event.stopPropagation();
                    goTo("/contact");
                  }}
                  className={`${dropdownItemClass} ${pathname === "/contact" ? activeDropdownItemClass : "text-gray-700 hover:bg-gray-100"}`}
                >
                  Contact
                </li>
                <li className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100">
                  <a href={companyProfile.documents.companyProfilePdf} target="_blank" rel="noreferrer">
                    Company Profile
                  </a>
                </li>
                <li className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100">
                  <a href={companyProfile.documents.productListPdf} target="_blank" rel="noreferrer">
                    Product List
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li
            onClick={() => goTo("/contact")}
            className={`${topLinkClass} ${pathname === "/contact" ? activeTopLinkClass : ""}`}
          >
            Contact
          </li>
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <SearchIcon
            className="search-icon h-5 w-5 cursor-pointer text-gray-600 hover:text-[#0d2d47]"
            onClick={() => setShowSearch((prev) => !prev)}
          />

          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setShowLanguages((prev) => !prev);
                setMenuOpen(false);
              }}
              className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-600 hover:text-[#0d2d47]"
            >
              <img
                src={`https://flagcdn.com/w20/${currentLang.flag}.png`}
                alt={currentLang.label}
                className="h-4 w-5 rounded-sm"
              />
              <span className="hidden sm:inline">{currentLang.label}</span>
            </button>

            {showLanguages && (
              <ul className="absolute right-0 z-50 mt-3 max-h-[320px] w-52 overflow-y-auto rounded-2xl border border-gray-100 bg-white/95 p-2 text-sm font-medium shadow-2xl backdrop-blur-md animate-[dropdownFade_0.22s_ease-out] lg:max-h-none lg:overflow-visible">
                {languages.map((item) => (
                  <li
                    key={item.code}
                    onClick={() => selectLanguage(item.code)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                  >
                    <img
                      src={`https://flagcdn.com/w20/${item.flag}.png`}
                      alt={item.label}
                      className="h-4 w-5 rounded-sm"
                    />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            className="lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5 text-gray-700" />
            ) : (
              <BarsIcon className="h-5 w-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {showSearch && (
        <div
          ref={searchRef}
          className="border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6 lg:px-10"
        >
          <form onSubmit={handleSearchSubmit} className="mx-auto max-w-7xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  const value = event.target.value;
                  setSearchTerm(value);
                  updateSuggestions(value);
                }}
                placeholder="Search products or ingredients..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm outline-none focus:border-[#0d2d47]"
              />

              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm("");
                  setSuggestions([]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          </form>

          {suggestions.length > 0 && (
            <div className="mx-auto mt-2 max-h-60 max-w-7xl overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {suggestions.map((item, index) => (
                <div
                  key={`${item.slug}-${index}`}
                  onClick={() => {
                    goTo(
                      item.type === "product"
                        ? `/products/${item.slug}`
                        : `/active-ingredients/${item.slug}`,
                    );
                    setSearchTerm("");
                  }}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {menuOpen && (
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-gray-100 bg-white/95 px-4 py-4 shadow-2xl backdrop-blur-md animate-[mobileMenuSlide_0.28s_ease-out] lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-2 text-sm font-medium text-gray-800">
            <li
              onClick={() => goTo("/")}
              className={`${topLinkClass} ${pathname === "/" ? activeTopLinkClass : ""}`}
            >
              Home
            </li>

            <li>
              <details className="group rounded-xl bg-gray-50 p-2">
                <summary className="flex cursor-pointer items-center justify-between px-2 py-2 text-[#0d2d47]">
                  <span
                    className={`rounded-full px-3 py-1 ${
                      isOfferingsActive ? activeTopLinkClass : ""
                    }`}
                  >
                    Our Products
                  </span>
                  <ChevronDownIcon className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>

                <div className="mt-2 flex flex-col gap-1 pl-2">
                  <span
                    onClick={() => goTo("/products")}
                    className={mobileSubItemClass(isProductsPath)}
                  >
                    Finished Products
                  </span>
                  <span
                    onClick={() => goTo("/pharmaceutical-products")}
                    className={mobileSubItemClass(
                      pathname === "/pharmaceutical-products" ||
                        pathname.startsWith("/pharmaceutical-products/"),
                    )}
                  >
                    Pharmaceutical Products
                  </span>
                  <span
                    onClick={() => goTo("/active-ingredients")}
                    className={mobileSubItemClass(isIngredientsPath)}
                  >
                    API / Ingredients
                  </span>
                  <span
                    onClick={() => goTo("/over-the-counter")}
                    className={mobileSubItemClass(pathname === "/over-the-counter")}
                  >
                    OTC
                  </span>
                  <span
                    onClick={() => goTo("/test-kits")}
                    className={mobileSubItemClass(
                      pathname === "/test-kits" || pathname.startsWith("/test-kits/"),
                    )}
                  >
                    Test Kits
                  </span>
                  <span
                    onClick={() => goTo("/private-label-manufacturing-oem")}
                    className={mobileSubItemClass(
                      pathname === "/private-label-manufacturing-oem",
                    )}
                  >
                    Private Label Manufacturing / OEM
                  </span>
                </div>
              </details>
            </li>

            <li
              onClick={() => goTo("/about")}
              className={`${topLinkClass} ${pathname === "/about" ? activeTopLinkClass : ""}`}
            >
              About Us
            </li>

            <li>
              <details className="group rounded-xl bg-gray-50 p-2">
                <summary className="flex cursor-pointer items-center justify-between px-2 py-2 text-[#0d2d47]">
                  <span
                    className={`rounded-full px-3 py-1 ${
                      isResourcesActive ? activeTopLinkClass : ""
                    }`}
                  >
                    Resources
                  </span>
                  <ChevronDownIcon className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>

                <div className="mt-2 flex flex-col gap-1 pl-2">
                  <span
                    onClick={() => goTo("/contact")}
                    className={mobileSubItemClass(pathname === "/contact")}
                  >
                    Contact
                  </span>
                  <a
                    href={companyProfile.documents.companyProfilePdf}
                    target="_blank"
                    rel="noreferrer"
                    className={mobileSubItemClass(false)}
                  >
                    Company Profile
                  </a>
                  <a
                    href={companyProfile.documents.productListPdf}
                    target="_blank"
                    rel="noreferrer"
                    className={mobileSubItemClass(false)}
                  >
                    Product List
                  </a>
                </div>
              </details>
            </li>

            <li
              onClick={() => goTo("/contact")}
              className={`${topLinkClass} ${pathname === "/contact" ? activeTopLinkClass : ""}`}
            >
              Contact
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
