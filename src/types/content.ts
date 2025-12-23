export interface ProductSpec {
    icon: string;
    label: string;
    value: string;
}

export interface PriceInfo {
    price: number;
    originalPrice?: number;
    url: string;
}

export interface ReviewMeta {
    product: {
        name: string;
        brand: string;
        model: string;
        image: string;
    };
    specs: ProductSpec[];
    pros: string[];
    cons: string[];
    ratings: {
        overall: number;
        performance?: number;
        display?: number;
        build?: number;
        battery?: number;
        value?: number;
    };
    prices: Record<string, PriceInfo>;
    deal?: {
        active: boolean;
        badge?: string;
        expiresAt?: string;
    };
}

export interface ReviewFrontmatter {
    title: string;
    excerpt: string;
    category: string;
    author: string;
    publishedAt: string;
    updatedAt?: string;
    rating: number;
    badge?: "editor" | "value" | null;
}

export interface Review {
    slug: string;
    frontmatter: ReviewFrontmatter;
    content: string;
    meta: ReviewMeta;
}
