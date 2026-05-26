import { absoluteUrl } from "@/lib/seo";
import { getAllTestKits } from "@/lib/test-kits";
import TestKitsTableClient from "./test-kits-table-client";

export const metadata = {
  title: "Test Kits",
  description: "Explore our diagnostic rapid test kits portfolio with filters for category, method, and specimen.",
  alternates: {
    canonical: "/test-kits",
  },
  openGraph: {
    title: "Test Kits | Larksois Pharma",
    description: "Explore our diagnostic rapid test kits portfolio.",
    url: absoluteUrl("/test-kits"),
    type: "website",
  },
};

export default function TestKitsPage() {
  const testKits = getAllTestKits();

  return (
    <div className="bg-[#f8f3f1] pb-12 pt-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0f3558]">Test Kits</h1>
          <p className="mt-2 text-[#334c63]">Explore our diagnostic rapid test kits portfolio.</p>
        </div>
        <div className="mt-8">
          <TestKitsTableClient testKits={testKits} />
        </div>
      </div>
    </div>
  );
}
