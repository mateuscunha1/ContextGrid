import Link from "next/link";
import { FileText, BarChart3, Plus, TrendingUp, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllReviews } from "@/lib/content";

export default async function AdminDashboard() {
    const reviews = await getAllReviews();

    // Calculate stats
    const totalReviews = reviews.length;
    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.frontmatter.rating, 0) / reviews.length).toFixed(1)
        : 0;
    const categoryCounts = reviews.reduce((acc, r) => {
        acc[r.frontmatter.category] = (acc[r.frontmatter.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black">Dashboard</h1>
                    <p className="text-muted-foreground">Visão geral do seu blog</p>
                </div>
                <Link href="/admin/reviews/new">
                    <Button className="btn-cta">
                        <Plus className="size-4 mr-2" />
                        Novo Review
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="size-5 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">Reviews</span>
                    </div>
                    <div className="text-3xl font-black">{totalReviews}</div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gold/10 rounded-lg">
                            <TrendingUp className="size-5 text-gold" />
                        </div>
                        <span className="text-sm text-muted-foreground">Rating Médio</span>
                    </div>
                    <div className="text-3xl font-black">{avgRating}/5</div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-success/10 rounded-lg">
                            <MousePointer className="size-5 text-success" />
                        </div>
                        <span className="text-sm text-muted-foreground">Cliques (7d)</span>
                    </div>
                    <div className="text-3xl font-black">—</div>
                    <p className="text-xs text-muted-foreground mt-1">Ver em Analytics</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <BarChart3 className="size-5 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">Categorias</span>
                    </div>
                    <div className="text-3xl font-black">{Object.keys(categoryCounts).length}</div>
                </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-card border border-border rounded-xl">
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h2 className="font-bold">Reviews Recentes</h2>
                    <Link href="/admin/reviews" className="text-sm text-primary hover:underline">
                        Ver todos
                    </Link>
                </div>
                <div className="divide-y divide-border">
                    {reviews.slice(0, 5).map((review) => (
                        <Link
                            key={review.slug}
                            href={`/admin/reviews/${review.slug}/edit`}
                            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.meta.product.image}
                                    alt={review.meta.product.name}
                                    className="size-12 object-cover rounded-lg bg-muted"
                                />
                                <div>
                                    <div className="font-medium">{review.meta.product.name}</div>
                                    <div className="text-sm text-muted-foreground capitalize">
                                        {review.frontmatter.category}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold">{review.frontmatter.rating}/5</span>
                                <span className="text-xs px-2 py-1 bg-muted rounded">
                                    {Object.keys(review.meta.prices).length} lojas
                                </span>
                            </div>
                        </Link>
                    ))}
                    {reviews.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            <p>Nenhum review ainda</p>
                            <Link href="/admin/reviews/new" className="text-primary hover:underline">
                                Criar o primeiro →
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <Link
                    href="/admin/reviews/new"
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
                >
                    <Plus className="size-8 text-primary mb-3" />
                    <h3 className="font-bold mb-1">Novo Review</h3>
                    <p className="text-sm text-muted-foreground">Gerar review com IA</p>
                </Link>

                <Link
                    href="/admin/analytics"
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
                >
                    <BarChart3 className="size-8 text-gold mb-3" />
                    <h3 className="font-bold mb-1">Analytics</h3>
                    <p className="text-sm text-muted-foreground">Ver cliques de afiliado</p>
                </Link>

                <Link
                    href="/admin/publish"
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
                >
                    <TrendingUp className="size-8 text-success mb-3" />
                    <h3 className="font-bold mb-1">Publicar</h3>
                    <p className="text-sm text-muted-foreground">Deploy para produção</p>
                </Link>
            </div>
        </div>
    );
}
