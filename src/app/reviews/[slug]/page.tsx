import { getReview, getReviewSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Calendar, Star, RefreshCw } from "lucide-react";
import { ProductHero } from "@/components/mdx/ProductHero";
import { SpecsTable } from "@/components/mdx/SpecsTable";
import { ProsCons } from "@/components/mdx/ProsCons";
import { StoreComparison } from "@/components/mdx/StoreComparison";
import { StickyBuyBar } from "@/components/mdx/StickyBuyBar";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JsonLd, generateProductSchema, generateBreadcrumbSchema } from "@/components/seo/JsonLd";
import { AffiliateDisclosure } from "@/components/seo/AffiliateDisclosure";

interface ReviewPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
    const { slug } = await params;
    const review = await getReview(slug);

    if (!review) {
        notFound();
    }

    const { frontmatter, content, meta } = review;

    // Components available in MDX
    const components = {
        ProductHero: () => <ProductHero meta={meta} frontmatter={frontmatter} />,
        SpecsTable: () => <SpecsTable meta={meta} />,
        ProsCons: () => <ProsCons meta={meta} />,
        StoreComparison: () => <StoreComparison meta={meta} />,
        StickyBuyBar: () => <StickyBuyBar meta={meta} />,
    };

    // Generate Product schema for rich snippets
    const productSchema = generateProductSchema({
        name: meta.product.name,
        image: meta.product.image,
        brand: meta.product.brand,
        description: frontmatter.excerpt,
        rating: frontmatter.rating,
        reviewBody: frontmatter.excerpt,
        prices: meta.prices,
    });

    // Generate Breadcrumb schema
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://context-grid.vercel.app";
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: siteUrl },
        { name: "Reviews", url: `${siteUrl}/reviews` },
        { name: frontmatter.title, url: `${siteUrl}/reviews/${slug}` },
    ]);

    return (
        <>
            <JsonLd data={productSchema} />
            <JsonLd data={breadcrumbSchema} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium uppercase tracking-wider">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="size-3" />
                    <Link href="/reviews" className="hover:text-foreground transition-colors">
                        Reviews
                    </Link>
                    <ChevronRight className="size-3" />
                    <span className="text-foreground capitalize">{frontmatter.category}</span>
                </div>

                {/* Header */}
                <header className="max-w-4xl mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
                        {frontmatter.title}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-4">{frontmatter.excerpt}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="size-4" />
                            <span>Publicado: {new Date(frontmatter.publishedAt).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <RefreshCw className="size-4" />
                            <span>Atualizado: {new Date().toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="size-4 fill-gold text-gold" />
                            <span className="font-bold">{frontmatter.rating}/5</span>
                        </div>
                    </div>
                </header>

                {/* Affiliate Disclosure */}
                <AffiliateDisclosure />

                {/* Product Hero */}
                <ProductHero meta={meta} frontmatter={frontmatter} />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <article className="lg:col-span-8 prose prose-lg max-w-none">
                        <MDXRemote source={content} components={components} />
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        {/* Specs */}
                        <SpecsTable meta={meta} />

                        {/* Pros/Cons */}
                        <ProsCons meta={meta} />

                        {/* Prices */}
                        <StoreComparison meta={meta} />
                    </aside>
                </div>

                {/* Sticky Buy Bar */}
                <StickyBuyBar meta={meta} />
            </div>
        </>
    );
}

export async function generateStaticParams() {
    const slugs = await getReviewSlugs();
    return slugs.map((slug) => ({ slug }));
}
