function AppleStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.71-2.48 4.34-2.51 1.35-.02 2.63.45 3.59.45 1.28 0 2.09-.49 3.12-.55 1.62 0 2.93 1.22 3.41 2.41-3.05.18-5.67 1.91-5.67 5.77 0 1.4.38 2.72 1.17 3.86zM13 3.5c.73-.83 1.94-1.5 3.13-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L8.19,21.69C7.88,21.9 7.5,22 7.12,22C6.56,22 6.06,21.75 5.72,21.35L16.81,15.12M21.16,10.27L17.57,12.18L21.16,14.09C22.22,13.5 22.9,12.42 22.9,11.18C22.9,9.94 22.22,8.86 21.16,8.27M16.81,7.08L5.72,0.85C6.06,0.45 6.56,0.2 7.12,0.2C7.5,0.2 7.88,0.3 8.19,0.51L16.81,7.08Z" />
    </svg>
  );
}

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-16 xl:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#ff6b35" strokeWidth="0.5" />
          <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="#ff6b35" strokeWidth="0.5" />
          <path d="M0,40 Q25,20 50,40 T100,40" fill="none" stroke="#ff6b35" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto px-6 text-center">
        <h2 className="font-display mb-6 text-5xl font-black md:text-7xl">
          READY TO <span className="text-orange-500">RIDE?</span>
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-400">
          Join 50,000+ riders who trust MotoRoute AI for their adventures. Native apps for iOS and Android are on the
          way—watch this space.
        </p>

        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex min-w-[240px] items-center gap-4 rounded-full border border-white/15 bg-white/5 px-6 py-4 backdrop-blur-sm sm:min-w-[260px] sm:px-8">
            <AppleStoreIcon className="h-10 w-10 shrink-0 text-white" />
            <div className="flex flex-col items-start text-left">
              <span className="font-bold text-white">App Store</span>
              <span className="text-sm font-medium text-orange-400">Coming soon</span>
            </div>
          </div>
          <div className="flex min-w-[240px] items-center gap-4 rounded-full border border-orange-500/30 bg-orange-500/10 px-6 py-4 backdrop-blur-sm sm:min-w-[260px] sm:px-8">
            <GooglePlayIcon className="h-10 w-10 shrink-0 text-white" />
            <div className="flex flex-col items-start text-left">
              <span className="font-bold text-white">Google Play</span>
              <span className="text-sm font-medium text-orange-400">Coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
