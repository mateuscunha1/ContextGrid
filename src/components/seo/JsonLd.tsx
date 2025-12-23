interface JsonLdProps {
    data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

// Helper to generate Product schema for reviews
export function generateProductSchema({
    name,
    image,
    brand,
    description,
    rating,
    reviewBody,
    prices,
}: {
    name: string;
    image: string;
    brand: string;
    description: string;
    rating: number;
    reviewBody: string;
    prices: Record<string, { price: number; originalPrice?: number; url: string }>;
}) {
    const priceValues = Object.values(prices).map((p) => p.price).filter((p) => p > 0);
    const lowPrice = priceValues.length > 0 ? Math.min(...priceValues) : undefined;
    const highPrice = priceValues.length > 0 ? Math.max(...priceValues) : undefined;

    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        image,
        description,
        brand: {
            "@type": "Brand",
            name: brand,
        },
        review: {
            "@type": "Review",
            author: {
                "@type": "Organization",
                name: "ContextGrid",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://contextgrid.vercel.app",
            },
            reviewRating: {
                "@type": "Rating",
                ratingValue: rating,
                bestRating: 5,
                worstRating: 1,
            },
            reviewBody,
        },
        ...(lowPrice && highPrice
            ? {
                offers: {
                    "@type": "AggregateOffer",
                    lowPrice,
                    highPrice,
                    priceCurrency: "BRL",
                    offerCount: priceValues.length,
                },
            }
            : {}),
    };
}

// Helper to generate WebSite schema
export function generateWebSiteSchema() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://contextgrid.vercel.app";

    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "ContextGrid",
        url: siteUrl,
        description: "Encontre os melhores preços em smartphones, notebooks e gadgets. Reviews detalhados + comparativo de lojas.",
        publisher: {
            "@type": "Organization",
            name: "ContextGrid",
            url: siteUrl,
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/og-image.png`,
            },
        },
    };
}

// Helper to generate Organization schema
export function generateOrganizationSchema() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://contextgrid.vercel.app";

    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ContextGrid",
        url: siteUrl,
        logo: `${siteUrl}/og-image.png`,
        sameAs: [],
    };
}
