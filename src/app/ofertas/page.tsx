import Link from "next/link";
import { ArrowRight, Clock, Mail, Flame, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDeals, getLatestReviews } from "@/lib/content";
import { Review } from "@/types/content";
import { AffiliateLink } from "@/components/ui/AffiliateLink";

// Store names
const storeNames: Record<string, string> = {
    amazon: "Amazon",
    kabum: "KaBuM!",
    pichau: "Pichau",
    terabyte: "Terabyte",
};

// Offer Card from MDX
function MDXOfferCard({ review }: { review: Review }) {
    const stores = Object.entries(review.meta.prices);
    const [lowestStore, lowestInfo] = stores.reduce((a, b) =>
        a[1].price < b[1].price ? a : b
    );
    const discount = lowestInfo.originalPrice
        ? Math.round((1 - lowestInfo.price / lowestInfo.originalPrice) * 100)
        : 0;

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <Link href={`/reviews/${review.slug}`} className="block">
                <div className="relative aspect-square bg-muted p-4">
                    {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                            -{discount}%
                        </span>
                    )}
                    <img
                        src={review.meta.product.image}
                        alt={review.meta.product.name}
                        className="w-full h-full object-contain"
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary uppercase">
                        {storeNames[lowestStore] || lowestStore}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="size-3 fill-gold text-gold" />
                        {review.frontmatter.rating}
                    </span>
                </div>

                <Link href={`/reviews/${review.slug}`}>
                    <h3 className="font-bold line-clamp-2 mb-3 hover:text-primary transition-colors">
                        {review.meta.product.name}
                    </h3>
                </Link>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                    {lowestInfo.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                            R$ {lowestInfo.originalPrice.toLocaleString("pt-BR")}
                        </span>
                    )}
                    <span className="text-xl font-black text-success">
                        R$ {lowestInfo.price.toLocaleString("pt-BR")}
                    </span>
                </div>

                {/* CTA */}
                <AffiliateLink
                    href={lowestInfo.url}
                    store={storeNames[lowestStore] || lowestStore}
                    productName={review.meta.product.name}
                    price={lowestInfo.price}
                    className="block"
                >
                    <Button className="w-full btn-cta">
                        Ver Oferta <ExternalLink className="size-4 ml-2" />
                    </Button>
                </AffiliateLink>
            </div>
        </div>
    );
}

export default async function OfertasPage() {
    const deals = await getDeals();
    const latestReviews = await getLatestReviews(8);

    // Use all reviews with prices as "offers"
    const reviewsWithPrices = latestReviews.filter(r =>
        Object.keys(r.meta.prices).length > 0
    );

    const featuredDeal = deals[0] || reviewsWithPrices[0];
    const otherOffers = deals.length > 0
        ? [...deals.slice(1), ...reviewsWithPrices.filter(r => !deals.includes(r))]
        : reviewsWithPrices.slice(1);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Badge */}
            <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold-foreground border border-gold/30 text-sm font-bold uppercase tracking-wider">
                    <span className="size-2 bg-gold rounded-full animate-pulse" />
                    Ofertas do Dia
                </span>
            </div>

            {/* Featured Offer */}
            {featuredDeal && (
                <section className="mb-12">
                    <div className="bento-card overflow-hidden">
                        <div className="grid md:grid-cols-2">
                            {/* Image Side */}
                            <Link href={`/reviews/${featuredDeal.slug}`} className="relative bg-gradient-to-br from-muted to-muted/50 p-8 flex items-center justify-center min-h-[300px]">
                                {featuredDeal.meta.deal?.badge && (
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded bg-destructive text-destructive-foreground text-xs font-bold uppercase">
                                            {featuredDeal.meta.deal.badge}
                                        </span>
                                    </div>
                                )}
                                <img
                                    src={featuredDeal.meta.product.image}
                                    alt={featuredDeal.meta.product.name}
                                    className="max-h-[250px] object-contain drop-shadow-xl"
                                />
                                {featuredDeal.meta.deal?.expiresAt && (
                                    <div className="absolute bottom-4 right-4 flex items-center gap-2 text-sm font-bold text-destructive">
                                        <Clock className="size-4" />
                                        Expira em {new Date(featuredDeal.meta.deal.expiresAt).toLocaleDateString("pt-BR")}
                                    </div>
                                )}
                            </Link>

                            {/* Content Side */}
                            <div className="p-8 flex flex-col justify-center bg-card">
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                                    {featuredDeal.frontmatter.category} •{" "}
                                    <span className="text-primary">
                                        {storeNames[Object.keys(featuredDeal.meta.prices)[0]] || "Loja"}
                                    </span>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-black mb-4">
                                    {featuredDeal.meta.product.name}
                                </h2>

                                <p className="text-muted-foreground mb-6">
                                    {featuredDeal.frontmatter.excerpt}
                                </p>

                                {/* Price */}
                                {(() => {
                                    const prices = Object.values(featuredDeal.meta.prices);
                                    const lowest = prices.reduce((a, b) => a.price < b.price ? a : b);
                                    const discount = lowest.originalPrice
                                        ? Math.round((1 - lowest.price / lowest.originalPrice) * 100)
                                        : 0;
                                    return (
                                        <div className="flex items-baseline gap-3 mb-2">
                                            {lowest.originalPrice && (
                                                <span className="text-sm text-muted-foreground line-through">
                                                    R$ {lowest.originalPrice.toLocaleString("pt-BR")}
                                                </span>
                                            )}
                                            <span className="text-3xl font-black text-success">
                                                R$ {lowest.price.toLocaleString("pt-BR")}
                                            </span>
                                            {discount > 0 && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-destructive text-destructive-foreground">
                                                    -{discount}% OFF
                                                </span>
                                            )}
                                        </div>
                                    );
                                })()}

                                {/* CTA */}
                                <AffiliateLink
                                    href={Object.values(featuredDeal.meta.prices)[0]?.url || "#"}
                                    store={storeNames[Object.keys(featuredDeal.meta.prices)[0]] || "Loja"}
                                    productName={featuredDeal.meta.product.name}
                                    price={Object.values(featuredDeal.meta.prices)[0]?.price || 0}
                                    className="inline-block"
                                >
                                    <Button className="w-full md:w-auto btn-cta py-4 px-8 mt-4">
                                        Pegar esta Oferta
                                        <ArrowRight className="size-5 ml-2" />
                                    </Button>
                                </AffiliateLink>

                                <Link href={`/reviews/${featuredDeal.slug}`} className="text-xs text-muted-foreground mt-4 hover:text-primary flex items-center gap-2">
                                    Ver review completo →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Offers Grid */}
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-8">
                    <Flame className="size-6 text-gold fill-gold" />
                    <h2 className="text-2xl font-black">Todas as Ofertas</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {otherOffers.map((review) => (
                        <MDXOfferCard key={review.slug} review={review} />
                    ))}
                </div>

                {otherOffers.length === 0 && (
                    <div className="text-center py-12 bg-muted/50 rounded-xl">
                        <p className="text-muted-foreground">Nenhuma oferta disponível no momento.</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Adicione <code className="bg-muted px-2 py-1 rounded">{'"deal": { "active": true }'}</code> no meta.json de um review.
                        </p>
                    </div>
                )}
            </section>

            {/* Newsletter CTA */}
            <div className="bg-gold rounded-2xl p-8 text-gold-foreground text-center">
                <div className="flex justify-center mb-4">
                    <div className="size-12 rounded-full bg-gold-foreground/10 flex items-center justify-center">
                        <Mail className="size-6" />
                    </div>
                </div>
                <h3 className="text-xl font-bold mb-2">
                    Não perca nenhuma oferta!
                </h3>
                <p className="text-sm opacity-80 mb-4 max-w-md mx-auto">
                    Receba as 5 melhores ofertas do dia no seu email, toda manhã. Sem spam.
                </p>
                <Button className="bg-gold-foreground text-gold hover:bg-gold-foreground/90">
                    Assinar Newsletter
                    <ArrowRight className="size-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
