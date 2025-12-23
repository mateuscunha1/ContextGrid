import { Star } from "lucide-react";
import { ReviewMeta, ReviewFrontmatter } from "@/types/content";

interface ProductHeroProps {
    meta: ReviewMeta;
    frontmatter: ReviewFrontmatter;
}

export function ProductHero({ meta, frontmatter }: ProductHeroProps) {
    const { product, ratings } = meta;

    return (
        <div className="relative overflow-hidden bg-card rounded-2xl featured-border shadow-xl p-6 md:p-8 mb-8">
            {/* Badge */}
            {frontmatter.badge === "editor" && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gold text-gold-foreground text-xs font-black uppercase tracking-widest px-4 py-1 rounded-b-lg">
                    Escolha do Editor
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8 items-center pt-4">
                {/* Image */}
                <div className="w-full lg:w-1/3 flex items-center justify-center bg-muted rounded-xl p-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-64 object-contain drop-shadow-lg"
                    />
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h2>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`size-5 ${i < Math.floor(ratings.overall) ? "fill-current" : "fill-none"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">
                            {ratings.overall}/5.0 (Baseado em testes de lab)
                        </span>
                    </div>

                    {/* Brand & Model */}
                    <p className="text-muted-foreground">
                        {product.brand} • Modelo {product.model}
                    </p>
                </div>
            </div>
        </div>
    );
}
