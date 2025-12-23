import Link from "next/link";
import { ChevronRight, Mail, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllReviews, getCategories } from "@/lib/content";
import { Review } from "@/types/content";

// Category display names
const categoryLabels: Record<string, string> = {
    windows: "Windows Laptops",
    apple: "Apple / macOS",
    gaming: "Gaming",
    smartphones: "Smartphones",
    budget: "Custo-Benefício",
    ultrabooks: "Ultrabooks",
};

// Review card for MDX content
function MDXReviewCard({ review }: { review: Review }) {
    return (
        <Link
            href={`/reviews/${review.slug}`}
            className="group block bg-card border border-border rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                <img
                    src={review.meta.product.image}
                    alt={review.meta.product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Badge */}
                {review.frontmatter.badge === "editor" && (
                    <div className="absolute top-3 left-3 bg-gold text-gold-foreground text-xs font-black uppercase px-2 py-1 rounded">
                        Escolha do Editor
                    </div>
                )}
                {/* Rating */}
                <div className="absolute bottom-3 right-3 bg-foreground/90 text-background text-sm font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Star className="size-3 fill-gold text-gold" />
                    {review.frontmatter.rating}
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Category */}
                <span className="text-xs text-primary font-medium uppercase tracking-wider">
                    {categoryLabels[review.frontmatter.category] || review.frontmatter.category}
                </span>

                {/* Title */}
                <h3 className="font-bold text-lg mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {review.meta.product.name}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {review.frontmatter.excerpt}
                </p>

                {/* Price if available */}
                {review.meta.prices && Object.keys(review.meta.prices).length > 0 && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">A partir de</span>
                        <span className="font-bold text-success">
                            R$ {Math.min(...Object.values(review.meta.prices).map(p => p.price)).toLocaleString("pt-BR")}
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
}

export default async function ReviewsPage() {
    const reviews = await getAllReviews();
    const categories = await getCategories();

    // Sort by date (newest first)
    const sortedReviews = reviews.sort(
        (a, b) =>
            new Date(b.frontmatter.publishedAt).getTime() -
            new Date(a.frontmatter.publishedAt).getTime()
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium uppercase tracking-wider">
                <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                </Link>
                <ChevronRight className="size-3" />
                <span className="text-foreground">Reviews</span>
            </div>

            {/* Page Header */}
            <header className="mb-10">
                <h1 className="text-4xl md:text-5xl font-black mb-4">
                    <span className="bg-foreground text-background px-3 py-1 inline-block mr-2">
                        Reviews
                    </span>
                    Tecnologia
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Análises aprofundadas, benchmarks de laboratório e vereditos honestos
                    sobre os últimos lançamentos do mercado.
                </p>
            </header>

            <hr className="border-border mb-8" />

            {/* Main Content */}
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Sidebar */}
                <aside className="lg:col-span-3 space-y-8">
                    {/* Categories */}
                    <div>
                        <h3 className="font-bold uppercase text-sm tracking-wider mb-4 border-b border-border pb-2">
                            Categorias
                        </h3>
                        <div className="space-y-2">
                            {categories.map((category) => {
                                const count = reviews.filter(r => r.frontmatter.category === category).length;
                                return (
                                    <div
                                        key={category}
                                        className="flex items-center justify-between py-1"
                                    >
                                        <span className="text-sm capitalize">
                                            {categoryLabels[category] || category}
                                        </span>
                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                            {count}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-muted/50 border border-border rounded-xl p-4">
                        <div className="text-center">
                            <div className="text-4xl font-black">{reviews.length}</div>
                            <div className="text-sm text-muted-foreground">Reviews Publicados</div>
                        </div>
                    </div>

                    {/* Newsletter Mini */}
                    <div className="bg-gold/10 border border-gold/30 rounded-xl p-4">
                        <div className="font-bold text-sm mb-2 text-center">
                            NÃO PERCA NADA
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 text-center">
                            Os melhores reviews na sua caixa de entrada.
                        </p>
                        <Button className="w-full bg-foreground text-background text-sm font-bold hover:bg-foreground/90">
                            <Mail className="size-4 mr-2" />
                            Assinar Newsletter
                        </Button>
                    </div>
                </aside>

                {/* Reviews Grid */}
                <div className="lg:col-span-9">
                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-sm text-muted-foreground">
                            Mostrando{" "}
                            <span className="font-bold text-foreground">
                                {sortedReviews.length}
                            </span>{" "}
                            reviews
                        </span>
                    </div>

                    {/* Grid */}
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {sortedReviews.map((review) => (
                            <MDXReviewCard key={review.slug} review={review} />
                        ))}
                    </div>

                    {/* Empty state */}
                    {sortedReviews.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Nenhum review encontrado.</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Use o comando <code className="bg-muted px-2 py-1 rounded">npm run new-review</code> para criar um review.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
