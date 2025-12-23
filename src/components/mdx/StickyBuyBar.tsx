"use client";

import { useState, useEffect } from "react";
import { ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AffiliateLink } from "@/components/ui/AffiliateLink";
import { ReviewMeta } from "@/types/content";

interface StickyBuyBarProps {
    meta: ReviewMeta;
}

const storeNames: Record<string, string> = {
    amazon: "Amazon",
    kabum: "KaBuM!",
    pichau: "Pichau",
    terabyte: "Terabyte",
};

export function StickyBuyBar({ meta }: StickyBuyBarProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // Find lowest price
    const stores = Object.entries(meta.prices);
    const [lowestStore, lowestInfo] = stores.reduce((a, b) =>
        a[1].price < b[1].price ? a : b
    );

    const discount = lowestInfo.originalPrice
        ? Math.round((1 - lowestInfo.price / lowestInfo.originalPrice) * 100)
        : 0;

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 600 && !isDismissed);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isDismissed]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-foreground text-background p-3 md:p-4 shadow-2xl z-50 animate-slide-in">
            <div className="container mx-auto flex items-center justify-between gap-4">
                {/* Product Info */}
                <div className="flex items-center gap-3 min-w-0">
                    <img
                        src={meta.product.image}
                        alt={meta.product.name}
                        className="size-10 md:size-12 object-contain bg-background rounded p-1 shrink-0"
                    />
                    <div className="min-w-0 hidden sm:block">
                        <p className="font-bold text-sm md:text-base truncate">{meta.product.name}</p>
                        <p className="text-xs opacity-80">
                            Melhor preço: {storeNames[lowestStore] || lowestStore}
                        </p>
                    </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Price */}
                    <div className="text-right">
                        {lowestInfo.originalPrice && (
                            <span className="text-xs line-through opacity-60 block">
                                R$ {lowestInfo.originalPrice.toLocaleString("pt-BR")}
                            </span>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="text-lg md:text-2xl font-black text-gold">
                                R$ {lowestInfo.price.toLocaleString("pt-BR")}
                            </span>
                            {discount > 0 && (
                                <span className="hidden md:inline-flex px-2 py-0.5 bg-destructive text-destructive-foreground text-xs font-bold rounded">
                                    -{discount}%
                                </span>
                            )}
                        </div>
                    </div>

                    {/* CTA with Tracking */}
                    <AffiliateLink
                        href={lowestInfo.url}
                        store={storeNames[lowestStore] || lowestStore}
                        productName={meta.product.name}
                        price={lowestInfo.price}
                    >
                        <Button className="btn-cta-gold whitespace-nowrap">
                            <span className="hidden sm:inline">Comprar Agora</span>
                            <span className="sm:hidden">Comprar</span>
                            <ExternalLink className="size-4 ml-1 md:ml-2" />
                        </Button>
                    </AffiliateLink>

                    {/* Dismiss */}
                    <button
                        onClick={() => setIsDismissed(true)}
                        className="p-2 hover:bg-background/10 rounded shrink-0"
                        aria-label="Fechar"
                    >
                        <X className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
