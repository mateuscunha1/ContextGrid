import Link from "next/link";
import { Plus, Star, ExternalLink, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllReviews } from "@/lib/content";

const categoryLabels: Record<string, string> = {
    windows: "Windows",
    apple: "Apple",
    gaming: "Gaming",
    smartphones: "Smartphones",
    budget: "Budget",
    ultrabooks: "Ultrabooks",
};

export default async function AdminReviewsPage() {
    const reviews = await getAllReviews();

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black">Reviews</h1>
                    <p className="text-muted-foreground">Gerencie todos os reviews do blog</p>
                </div>
                <Link href="/admin/reviews/new">
                    <Button className="btn-cta">
                        <Plus className="size-4 mr-2" />
                        Novo Review
                    </Button>
                </Link>
            </div>

            {/* Reviews Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="text-left p-4 font-bold text-sm">Produto</th>
                            <th className="text-left p-4 font-bold text-sm">Categoria</th>
                            <th className="text-left p-4 font-bold text-sm">Rating</th>
                            <th className="text-left p-4 font-bold text-sm">Lojas</th>
                            <th className="text-left p-4 font-bold text-sm">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {reviews.map((review) => (
                            <tr key={review.slug} className="hover:bg-muted/30 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={review.meta.product.image}
                                            alt={review.meta.product.name}
                                            className="size-12 object-cover rounded-lg bg-muted"
                                        />
                                        <div>
                                            <div className="font-medium line-clamp-1">{review.meta.product.name}</div>
                                            <div className="text-xs text-muted-foreground">{review.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="text-sm px-2 py-1 bg-muted rounded capitalize">
                                        {categoryLabels[review.frontmatter.category] || review.frontmatter.category}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="size-4 fill-gold text-gold" />
                                        <span className="font-bold">{review.frontmatter.rating}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="text-sm">{Object.keys(review.meta.prices).length} lojas</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/reviews/${review.slug}/edit`}>
                                            <Button variant="ghost" size="sm">
                                                <Edit className="size-4" />
                                            </Button>
                                        </Link>
                                        <Link href={`/reviews/${review.slug}`} target="_blank">
                                            <Button variant="ghost" size="sm">
                                                <ExternalLink className="size-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {reviews.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-muted-foreground mb-4">Nenhum review encontrado</p>
                        <Link href="/admin/reviews/new">
                            <Button>
                                <Plus className="size-4 mr-2" />
                                Criar primeiro review
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
