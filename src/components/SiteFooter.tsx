import Image from "next/image";
import Link from "next/link";
import { cdn } from "@motoroute/lib/cdn";

const exploreLinks = [
  { href: "#features", label: "Features" },
  { href: "#planner", label: "Planner" },
  { href: "#map", label: "Map" },
  { href: "#community", label: "Community" },
  { href: "#safety", label: "Safety" },
] as const;

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="relative border-t border-gray-800/90 bg-black/90 text-gray-400 backdrop-blur-md"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" aria-hidden />

      <div className="mx-auto  px-6 pb-10 pt-14 sm:px-8 md:px-10 lg:px-12">
        <div className="grid gap-12 py-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 xl:py-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5">
            <a
              href="#"
              className="group inline-flex max-w-full items-center gap-3 rounded-lg outline-offset-4 focus-visible:outline-2 focus-visible:outline-orange-500"
            >
              <span className="block shrink-0 overflow-hidden rounded-2xl ring-1 ring-gray-800 transition-[box-shadow] group-hover:ring-orange-500/40">
                <Image
                  src={cdn("/logo.png")}
                  alt=""
                  width={556}
                  height={572}
                  aria-hidden
                  className="block h-11 w-auto object-contain"
                />
              </span>
              <span className="min-w-0 leading-none">
                <span className="font-racing block text-2xl tracking-wide text-white transition-colors group-hover:text-gray-100 sm:text-3xl">
                  MOTO<span className="text-orange-500">ROUTE</span>
                </span>
                <span className="font-oswald mt-1 block text-xs font-medium tracking-[0.2em] text-gray-500">
                  BUILT FOR THE RIDE
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-gray-500">
              AI routing, weather intel, and ride crew tools—navigation tuned for motorcycles, not cars.
            </p>
          </div>

          {/* Explore */}
          <nav className="lg:col-span-3" aria-labelledby="footer-explore-heading">
            <h2 id="footer-explore-heading" className="font-oswald text-xs font-bold tracking-[0.2em] text-gray-500">
              EXPLORE
            </h2>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-oswald inline-flex min-h-10 items-center text-sm font-medium tracking-wide text-gray-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal / meta */}
          <nav className="lg:col-span-4" aria-labelledby="footer-legal-heading">
            <h2 id="footer-legal-heading" className="font-oswald text-xs font-bold tracking-[0.2em] text-gray-500">
              LEGAL
            </h2>
            <ul className="mt-5 space-y-3">
              {legalLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-oswald inline-flex min-h-10 items-center text-sm font-medium tracking-wide text-gray-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs leading-relaxed text-gray-600">
              Maps and routing are for planning only. Always obey local traffic laws and ride within your limits.
            </p>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-gray-800/80 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-gray-600 sm:text-left">
            <span className="text-gray-500">© {year} MotoRoute AI.</span> All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-600 sm:text-right">Designed for riders. No compromises.</p>
        </div>
      </div>
    </footer>
  );
}
