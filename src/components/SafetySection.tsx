export function SafetySection() {
  return (
    <section id="safety" className="cyber-grid relative py-16 xl:py-32">
      <div className="mx-auto px-6 flex flex-col items-center">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2 className="font-display mb-6 text-4xl font-bold md:text-6xl">
            SAFETY <span className="text-red-500">FIRST</span>
          </h2>
          <p className="text-base text-gray-400 md:text-lg">Advanced safety features designed to protect you when it matters most.</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div className="feature-card group bg-gradient-to-b from-gray-900 to-black p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 transition-transform duration-300 group-hover:scale-110">
              <svg className="h-10 w-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="font-display mb-3 text-xl font-bold">Severe Weather Alerts</h3>
            <p className="mb-4 text-base text-gray-400">
              Automatic warnings when storms, high winds, or ice intersect your route.
            </p>
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-left">
              <div className="mb-1 flex items-center gap-2 text-sm font-bold text-red-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                ALERT EXAMPLE
              </div>
              <div className="text-sm text-gray-300">Heavy rain expected in 12 miles. Alternative route available.</div>
            </div>
          </div>

          <div className="feature-card group bg-gradient-to-b from-gray-900 to-black p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/10 transition-transform duration-300 group-hover:scale-110">
              <svg className="h-10 w-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="font-display mb-3 text-xl font-bold">Emergency Contact</h3>
            <p className="mb-4 text-base text-gray-400">One-tap emergency calling with automatic GPS coordinate sharing.</p>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-orange-500/50 bg-orange-500/20 py-3 text-sm font-bold text-orange-400 transition-colors hover:bg-orange-500/30"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Configure SOS
            </button>
          </div>

          <div className="feature-card group bg-gradient-to-b from-gray-900 to-black p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 transition-transform duration-300 group-hover:scale-110">
              <svg className="h-10 w-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-display mb-3 text-xl font-bold">Crash Detection</h3>
            <p className="mb-4 text-base text-gray-400">
              AI monitors accelerometer data to detect accidents and alert emergency services.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Monitoring Active
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
