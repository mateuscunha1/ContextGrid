"use client";

import { useCallback } from "react";

interface ClickEvent {
    id: string;
    productName: string;
    store: string;
    price: number;
    url: string;
    timestamp: string;
    source: string; // página de origem
}

export function useAffiliateClick() {
    const trackClick = useCallback((event: Omit<ClickEvent, "id" | "timestamp">) => {
        const clickData: ClickEvent = {
            ...event,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
        };

        // Salvar no localStorage
        const existing = JSON.parse(localStorage.getItem("affiliate_clicks") || "[]");
        existing.push(clickData);
        localStorage.setItem("affiliate_clicks", JSON.stringify(existing));

        // Log para debug
        console.log("[Affiliate Click]", clickData);

        // Aqui pode integrar com GA4, Posthog, etc.
        // gtag('event', 'affiliate_click', clickData);
    }, []);

    const getClicks = useCallback((): ClickEvent[] => {
        if (typeof window === "undefined") return [];
        return JSON.parse(localStorage.getItem("affiliate_clicks") || "[]");
    }, []);

    const clearClicks = useCallback(() => {
        localStorage.removeItem("affiliate_clicks");
    }, []);

    const getStats = useCallback(() => {
        const clicks = getClicks();

        const byStore = clicks.reduce((acc, click) => {
            acc[click.store] = (acc[click.store] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const byProduct = clicks.reduce((acc, click) => {
            acc[click.productName] = (acc[click.productName] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const totalPotential = clicks.reduce((acc, click) => acc + click.price, 0);

        return {
            totalClicks: clicks.length,
            totalPotential,
            byStore,
            byProduct,
            recentClicks: clicks.slice(-10).reverse(),
        };
    }, [getClicks]);

    return { trackClick, getClicks, clearClicks, getStats };
}

export type { ClickEvent };
