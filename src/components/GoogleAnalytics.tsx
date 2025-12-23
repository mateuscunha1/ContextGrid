"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics as GA } from "@next/third-parties/google";

const CONSENT_KEY = "cookie-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-J72W1VCQCB";

export function GoogleAnalytics() {
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        // Check consent on mount
        const consent = localStorage.getItem(CONSENT_KEY);
        setHasConsent(consent === "true");
    }, []);

    // Only render GA if user has given consent
    if (!hasConsent) return null;

    return <GA gaId={GA_ID} />;
}
