import { Manrope, Spectral } from "next/font/google";
import "./globals.css";
import { companyProfile } from "@/data/companyProfile";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import AnalyticsScripts from "@/components/layout/analytics-scripts";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Larksois Pharma | Global Pharmaceutical Supplier",
    template: "%s | Larksois Pharma",
  },
  description:
    "Larksois Pharma is a global pharmaceutical supplier for quality generic and branded formulations. Explore products and request quotations for international markets.",
  keywords: [
    "Larksois Pharma",
    "Larksois Pharmaceuticals",
    "pharmaceutical supplier",
    "generic medicines manufacturer",
    "pharma export company",
    "bulk medicine supplier",
    "pharmaceutical products",
    "API and formulations",
  ],
  authors: [{ name: "Larksois Pharma" }],
  creator: "Larksois Pharma",
  publisher: "Larksois Pharma",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Larksois Pharma | Global Pharmaceutical Supplier",
    description:
      "Explore Larksois Pharma products, formulations, and quotation support for global pharmaceutical markets.",
    url: SITE_URL,
    siteName: "Larksois Pharma",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Larksois Pharma | Global Pharmaceutical Supplier",
    description:
      "Explore Larksois Pharma products and submit quotation inquiries for global supply.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

const year = new Date().getFullYear();

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyProfile.brand,
    legalName: companyProfile.legalName,
    url: SITE_URL,
    logo: absoluteUrl("/larko.png"),
    telephone: companyProfile.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyProfile.officeAddress,
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: companyProfile.phone,
        availableLanguage: ["English"],
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: companyProfile.brand,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: companyProfile.brand,
      url: SITE_URL,
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <AnalyticsScripts />
      </head>
      <body className={`${manrope.variable} ${spectral.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-4 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec671f]"
        >
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col">
          <SiteHeader navLinks={navLinks} companyProfile={companyProfile} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter companyProfile={companyProfile} year={year} />
        </div>
      </body>
    </html>
  );
}
