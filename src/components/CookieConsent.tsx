"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "cookie-consent";

export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem(CONSENT_KEY);
        if (consent === null) {
            // Small delay to avoid flash on page load
            const timer = setTimeout(() => setShowBanner(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, "true");
        setShowBanner(false);
        // Reload to load GA
        window.location.reload();
    };

    const handleReject = () => {
        localStorage.setItem(CONSENT_KEY, "false");
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-card border-2 border-border rounded-xl p-4 md:p-6 shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Icon & Text */}
                        <div className="flex items-start gap-3 flex-1">
                            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                                <Cookie className="size-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm mb-1">Sua privacidade importa</h3>
                                <p className="text-xs text-muted-foreground">
                                    Usamos cookies para analisar o tráfego e melhorar sua experiência.
                                    Nenhum dado pessoal é vendido ou compartilhado.{" "}
                                    <Link href="/legal" className="underline hover:text-foreground">
                                        Saiba mais
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 flex-shrink-0">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleReject}
                                className="flex-1 md:flex-none"
                            >
                                Recusar
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleAccept}
                                className="flex-1 md:flex-none"
                            >
                                Aceitar
                            </Button>
                        </div>

                        {/* Close button (mobile) */}
                        <button
                            onClick={handleReject}
                            className="absolute top-2 right-2 md:hidden text-muted-foreground hover:text-foreground"
                            aria-label="Fechar"
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper to check if consent was given
export function hasAnalyticsConsent(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(CONSENT_KEY) === "true";
}
