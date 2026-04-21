import { useEffect, useState } from "react";

const DESKTOP_NAV_MQ = "(min-width: 1280px) and (hover: hover) and (pointer: fine)";

function isPhoneClassDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { userAgentData?: { mobile?: boolean } };
  if (nav.userAgentData?.mobile === true) return true;
  // Client Hints not available: match typical phone UA (avoid “Android tablet” strings without Mobile).
  return /Android.+Mobile|iPhone|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

/**
 * True only for mouse-first desktops. Real phones stay on the drawer even when the layout viewport
 * or pointer media queries look like a desktop (common on Android Chrome + high-DPR devices).
 */
export function useDesktopNav() {
  const [desktopNav, setDesktopNav] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_NAV_MQ);
    const apply = () => {
      if (isPhoneClassDevice()) {
        setDesktopNav(false);
        return;
      }
      setDesktopNav(mq.matches);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return desktopNav;
}
