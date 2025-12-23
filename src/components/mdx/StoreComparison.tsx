"use client";

import { ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AffiliateLink } from "@/components/ui/AffiliateLink";
import { ReviewMeta } from "@/types/content";

interface StoreComparisonProps {
    meta: ReviewMeta;
}

const storeNames: Record<string, string> = {
    amazon: "Amazon",
    kabum: "KaBuM!",
    pichau: "Pichau",
    terabyte: "Terabyte",
    aliexpress: "AliExpress",
    mercadolivre: "Mercado Livre",
};

const storeColors: Record<string, string> = {
    amazon: "bg-orange-500",
    kabum: "bg-blue-600",
    pichau: "bg-green-600",
    terabyte: "bg-purple-600",
    aliexpress: "bg-red-500",
    mercadolivre: "bg-yellow-500",
};

export function StoreComparison({ meta }: StoreComparisonProps) {
    const stores = Object.entries(meta.prices).sort((a, b) => a[1].price - b[1].price);
    const lowestPrice = stores[0]?.[1].price;

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden my-8">
            {/* Header */}
            <div className="bg-foreground text-background px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-lg flex items-center gap-2">
                    <Tag className="size-5" />
                    Compare Preços
                </h3>
                <span className="text-sm opacity-80">
                    Atualizado hoje
                </span>
            </div>

            {/* Store List */}
            <div className="divide-y divide-border">
                {stores.map(([store, info]) => {
                    const isLowest = info.price === lowestPrice;
                    const discount = info.originalPrice
                        ? Math.round((1 - info.price / info.originalPrice) * 100)
                        : 0;

                    return (
                        <div
                            key={store}
                            className={`flex items-center justify-between p-4 ${isLowest ? "bg-success/5" : ""
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Store indicator */}
                                <div className={`size-3 rounded-full ${storeColors[store] || "bg-gray-500"}`} />

                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{storeNames[store] || store}</span>
                                        {isLowest && (
                                            <span className="px-2 py-0.5 bg-success text-success-foreground text-xs font-bold rounded">
                                                Menor Preço
                                            </span>
                                        )}
                                        {discount > 0 && (
                                            <span className="px-2 py-0.5 bg-destructive text-destructive-foreground text-xs font-bold rounded">
                                                -{discount}%
                                            </span>
                                        )}
                                    </div>
                                    {info.originalPrice && (
                                        <span className="text-sm text-muted-foreground line-through">
                                            R$ {info.originalPrice.toLocaleString("pt-BR")}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`text-xl font-bold ${isLowest ? "text-success" : ""}`}>
                                    R$ {info.price.toLocaleString("pt-BR")}
                                </span>
                                <AffiliateLink
                                    href={info.url}
                                    store={storeNames[store] || store}
                                    productName={meta.product.name}
                                    price={info.price}
                                >
                                    <Button size="sm" className={isLowest ? "btn-cta" : ""}>
                                        Ver Oferta <ExternalLink className="size-3 ml-1" />
                                    </Button>
                                </AffiliateLink>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Disclaimer */}
            <div className="px-6 py-3 bg-muted/50 text-xs text-muted-foreground text-center">
                Preços podem variar. Ao comprar através de nossos links, podemos receber uma comissão.
            </div>
        </div>
    );
}
