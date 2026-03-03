import { useState, useEffect } from 'react';

/**
 * Returns true when viewport width ≤ breakpoint (default 768px).
 * Uses matchMedia for performance — no resize-listener spam.
 */
export default function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth <= breakpoint;
    });

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
        const handler = (e) => setIsMobile(e.matches);

        // Modern browsers
        if (mql.addEventListener) {
            mql.addEventListener('change', handler);
        } else {
            mql.addListener(handler);
        }

        // Sync on mount
        setIsMobile(mql.matches);

        return () => {
            if (mql.removeEventListener) {
                mql.removeEventListener('change', handler);
            } else {
                mql.removeListener(handler);
            }
        };
    }, [breakpoint]);

    return isMobile;
}
