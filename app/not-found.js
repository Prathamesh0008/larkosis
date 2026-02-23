import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-[#2a1d15]">Product Not Found</h1>
      <p className="mt-3 text-sm text-[#5c4335]">
        The requested product page is unavailable. Please browse the full
        catalog.
      </p>
      <Link
        href="/products"
        className="mt-6 rounded-xl bg-[#ec671f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d85f1d]"
      >
        Go to Product List
      </Link>
    </div>
  );
}
