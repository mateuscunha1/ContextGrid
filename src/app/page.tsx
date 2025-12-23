import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { DailyOffer } from "@/components/sections/DailyOffer";
import { TrendingNow } from "@/components/sections/TrendingNow";
import { Newsletter } from "@/components/sections/Newsletter";
import { Button } from "@/components/ui/button";
import { getFeaturedReview, getLatestReviews, getDeals } from "@/lib/content";
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

// Featured Review Card using MDX data
function MDXFeaturedReview({ review }: { review: Review }) {
  return (
    <Link
      href={`/reviews/${review.slug}`}
      className="group block relative bg-card border-2 border-border rounded-2xl overflow-hidden featured-border hover:-translate-y-1 hover:shadow-xl transition-all"
    >
      {/* Background Image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <img
          src={review.meta.product.image}
          alt={review.meta.product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Badge */}
        {review.frontmatter.badge === "editor" && (
          <div className="absolute top-4 left-4 bg-gold text-gold-foreground text-xs font-black uppercase px-3 py-1 rounded">
            Escolha do Editor
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/20 px-2 py-1 rounded mb-3 inline-block">
          {categoryLabels[review.frontmatter.category] || review.frontmatter.category}
        </span>

        <h2 className="text-2xl md:text-4xl font-black leading-tight mb-3 group-hover:text-gold transition-colors">
          {review.meta.product.name}
        </h2>

        <p className="text-white/80 mb-4 line-clamp-2 max-w-2xl">
          {review.frontmatter.excerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-white/60">
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-gold text-gold" />
            <span className="font-bold text-white">{review.frontmatter.rating}/5</span>
          </div>
          <span>{new Date(review.frontmatter.publishedAt).toLocaleDateString("pt-BR")}</span>
        </div>
      </div>
    </Link>
  );
}

// Review Card using MDX data
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
        {review.frontmatter.badge === "editor" && (
          <div className="absolute top-3 left-3 bg-gold text-gold-foreground text-xs font-black uppercase px-2 py-1 rounded">
            Escolha do Editor
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-foreground/90 text-background text-sm font-bold px-2 py-1 rounded flex items-center gap-1">
          <Star className="size-3 fill-gold text-gold" />
          {review.frontmatter.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">
          {categoryLabels[review.frontmatter.category] || review.frontmatter.category}
        </span>

        <h3 className="font-bold text-lg mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {review.meta.product.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {review.frontmatter.excerpt}
        </p>

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

export default async function HomePage() {
  const featuredReview = await getFeaturedReview();
  const latestReviews = await getLatestReviews(6);
  const deals = await getDeals();

  // Get deal for DailyOffer
  const dealReview = deals[0];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section - Bento Grid */}
      <section className="grid lg:grid-cols-12 gap-6 mb-16">
        {/* Featured Review - spans 8 columns */}
        <div className="lg:col-span-8">
          {featuredReview ? (
            <MDXFeaturedReview review={featuredReview} />
          ) : (
            <div className="bg-muted rounded-2xl aspect-[21/9] flex items-center justify-center">
              <p className="text-muted-foreground">Nenhum review em destaque</p>
            </div>
          )}
        </div>

        {/* Sidebar - spans 4 columns */}
        <div className="lg:col-span-4 space-y-6">
          {dealReview ? (
            <DailyOffer
              title={dealReview.meta.product.name}
              image={dealReview.meta.product.image}
              originalPrice={Object.values(dealReview.meta.prices)[0]?.originalPrice || 0}
              currentPrice={Object.values(dealReview.meta.prices)[0]?.price || 0}
            />
          ) : (
            <div className="bg-muted rounded-xl aspect-square flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Nenhuma oferta ativa</p>
            </div>
          )}
          <TrendingNow
            items={latestReviews.slice(0, 3).map(r => ({
              id: r.slug,
              category: r.frontmatter.category,
              title: r.meta.product.name,
            }))}
          />
        </div>
      </section>

      {/* Latest Reviews Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black italic">
              Últimos Reviews
            </h2>
            <p className="text-muted-foreground mt-1">
              Nossas análises mais recentes e imparciais.
            </p>
          </div>
          <Link href="/reviews">
            <Button variant="ghost" className="text-primary font-medium">
              Ver todos
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestReviews.map((review) => (
            <MDXReviewCard key={review.slug} review={review} />
          ))}
        </div>

        {/* Empty state */}
        {latestReviews.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-xl">
            <p className="text-muted-foreground">Nenhum review encontrado.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Use <code className="bg-muted px-2 py-1 rounded">npm run new-review</code> para criar reviews.
            </p>
          </div>
        )}

        {/* Load More */}
        {latestReviews.length > 0 && (
          <div className="flex justify-center mt-10">
            <Link href="/reviews">
              <Button variant="outline" className="btn-outline">
                Carregar Mais Reviews
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <Newsletter variant="dark" />
    </div>
  );
}
