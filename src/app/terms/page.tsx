import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-[50vh] max-w-screen-md px-6 py-24 text-gray-300">
      <h1 className="font-racing text-4xl text-white">Terms</h1>
      <p className="mt-4 text-sm leading-relaxed text-gray-400">
        This terms page is a placeholder. Replace with your real terms of service before launch.
      </p>
      <Link
        href="/"
        className="font-oswald mt-8 inline-block text-sm font-medium tracking-wide text-orange-500 hover:text-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      >
        ← Back home
      </Link>
    </main>
  );
}
