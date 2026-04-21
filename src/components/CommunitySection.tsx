export function CommunitySection() {
  return (
    <section id="community" className="relative overflow-hidden py-16 xl:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-purple-600/10" />

      <div className="relative mx-auto px-6 ride-together-wrapper">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          <div className="ride-together-copy flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/55 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              RIDE TOGETHER,
              <br />
              <span className="text-orange-500">EVEN WHEN APART</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-200">
              Group rides have never been easier. Share your route with a unique link, track live locations, and see
              everyone&apos;s ETA in real-time.
            </p>

            <div className="ride-together-features w-full space-y-6">
              <div className="ride-together-feature-row flex w-full items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500/20">
                  <svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 text-lg font-bold text-white">Unique Share Links</h4>
                  <p className="text-base leading-snug text-gray-300">
                    Generate instant URLs to share your exact route configuration with anyone.
                  </p>
                </div>
              </div>

              <div className="ride-together-feature-row flex w-full items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                  <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 text-lg font-bold text-white">Live GPS Tracking</h4>
                  <p className="text-base leading-snug text-gray-300">
                    See your group&apos;s exact position and speed on the map in real-time.
                  </p>
                </div>
              </div>

              <div className="ride-together-feature-row flex w-full items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 text-lg font-bold text-white">Smart ETAs</h4>
                  <p className="text-base leading-snug text-gray-300">
                    AI calculates arrival times based on riding style and current traffic.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary mt-10 rounded-full px-8 py-4 font-bold tracking-wider text-white transition-transform hover:scale-105"
            >
              CREATE GROUP RIDE
            </button>
          </div>

          <div className="relative phone-wrapper flex justify-center">
            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-3xl" />

            {/* Phone frame — left side buttons */}
            <div className="absolute left-1/2 top-[18%] -translate-x-[166px] flex flex-col gap-2 z-10">
              <div className="h-8 w-[3px] rounded-full bg-gray-600" />
              <div className="h-12 w-[3px] rounded-full bg-gray-600" />
              <div className="h-12 w-[3px] rounded-full bg-gray-600" />
            </div>
            {/* Phone frame — right side button */}
            <div className="absolute left-1/2 top-[28%] translate-x-[163px] z-10">
              <div className="h-16 w-[3px] rounded-full bg-gray-600" />
            </div>

            <div className="relative mx-auto w-[320px] overflow-hidden rounded-[3rem] border-[6px] border-gray-800 bg-gray-900 shadow-[0_30px_80px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
              {/* Status bar */}
              <div className="flex items-center justify-between bg-gray-900 px-6 pt-3 pb-1">
                <span className="text-[11px] font-semibold text-white">9:41</span>
                {/* Dynamic island */}
                <div className="h-[22px] w-[90px] rounded-full bg-black" />
                <div className="flex items-center gap-1">
                  {/* Signal bars */}
                  <svg className="h-3 w-4 text-white" viewBox="0 0 16 12" fill="currentColor" aria-hidden>
                    <rect x="0" y="8" width="3" height="4" rx="0.5" />
                    <rect x="4.5" y="5" width="3" height="7" rx="0.5" />
                    <rect x="9" y="2" width="3" height="10" rx="0.5" opacity="0.4" />
                    <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.4" />
                  </svg>
                  {/* Battery */}
                  <svg className="h-3 w-6 text-white" viewBox="0 0 24 12" fill="currentColor" aria-hidden>
                    <rect x="0" y="1" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <rect x="1.5" y="2.5" width="13" height="7" rx="1" />
                    <path d="M21.5 4v4c1-.5 1-3.5 0-4z" />
                  </svg>
                </div>
              </div>
              <div className="bg-gray-900 px-5 pb-2 pt-1">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <span className="font-display text-sm font-bold">Group Ride</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                    <span className="text-sm text-green-500">LIVE</span>
                  </div>
                </div>

                <div className="relative mb-4 h-52 overflow-hidden rounded-2xl bg-gray-800">
                  <div className="absolute inset-0 opacity-30">
                    <svg width="100%" height="100%" aria-hidden>
                      <title>Grid</title>
                      <pattern id="community-grid" width={20} height={20} patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#community-grid)" />
                    </svg>
                  </div>
                  <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full border-2 border-white bg-orange-500 text-xs font-bold">
                      You
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-[10px] font-bold">
                      M
                    </div>
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 transform">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-purple-500 text-[10px] font-bold">
                      J
                    </div>
                  </div>
                  <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                    <path
                      d="M 60,60 Q 150,100 200,150 T 280,200"
                      fill="none"
                      stroke="#ff6b35"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                      opacity="0.8"
                    />
                  </svg>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-orange-500/30 bg-gray-800/50 p-3">
                    <div className="flex min-h-10 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold">
                        You
                      </div>
                      <div className="flex min-h-10 flex-col justify-center gap-0.5">
                        <div className="text-sm font-bold leading-tight text-white">You</div>
                        <div className="text-sm leading-snug text-gray-300">Riding now • 65mph</div>
                      </div>
                    </div>
                    <div className="self-center text-right">
                      <div className="text-sm font-bold text-orange-500">LEADER</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-gray-800/30 p-3">
                    <div className="flex min-h-10 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold">M</div>
                      <div className="flex min-h-10 flex-col justify-center gap-0.5">
                        <div className="text-sm font-bold leading-tight text-white">Mike</div>
                        <div className="text-sm leading-snug text-gray-300">2.3 mi behind</div>
                      </div>
                    </div>
                    <div className="self-center text-right text-sm text-gray-300">ETA 12:42</div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-gray-800/30 p-3">
                    <div className="flex min-h-10 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-bold">J</div>
                      <div className="flex min-h-10 flex-col justify-center gap-0.5">
                        <div className="text-sm font-bold leading-tight text-white">Jessica</div>
                        <div className="text-sm leading-snug text-gray-300">4.1 mi behind</div>
                      </div>
                    </div>
                    <div className="self-center text-right text-sm text-gray-300">ETA 12:48</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gray-800 py-3 text-sm font-bold transition-colors hover:bg-gray-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                    Voice
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/20 py-3 text-sm font-bold text-red-400"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    SOS
                  </button>
                </div>
              </div>
              {/* Home indicator */}
              <div className="flex justify-center bg-gray-900 pb-3 pt-2">
                <div className="h-1 w-28 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
