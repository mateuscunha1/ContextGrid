"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function NewReviewPage() {
    const router = useRouter();
    const [productName, setProductName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productName.trim()) return;

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productName }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create review");
            }

            // Redirect to edit page
            router.push(`/admin/reviews/${data.slug}/edit`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao criar review");
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Back Link */}
            <Link
                href="/admin/reviews"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
                <ArrowLeft className="size-4" />
                Voltar para Reviews
            </Link>

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black mb-2">Novo Review</h1>
                <p className="text-muted-foreground">
                    Digite o nome do produto e a IA vai gerar o conteúdo automaticamente.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6">
                    <label className="block text-sm font-medium mb-2">
                        Nome do Produto
                    </label>
                    <Input
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Ex: iPhone 16 Pro Max 256GB"
                        className="text-lg"
                        disabled={isLoading}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                        Seja específico: inclua modelo, variante, capacidade, etc.
                    </p>
                </div>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-destructive text-sm">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full btn-cta py-6 text-lg"
                    disabled={isLoading || !productName.trim()}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="size-5 mr-2 animate-spin" />
                            Gerando review...
                        </>
                    ) : (
                        <>
                            <Sparkles className="size-5 mr-2" />
                            Gerar Review com IA
                        </>
                    )}
                </Button>

                {isLoading && (
                    <div className="text-center text-sm text-muted-foreground">
                        <p>Isso pode levar até 30 segundos...</p>
                        <p>A IA está pesquisando e escrevendo o conteúdo.</p>
                    </div>
                )}
            </form>

            {/* Tips */}
            <div className="mt-8 bg-muted/50 border border-border rounded-xl p-6">
                <h3 className="font-bold mb-3">💡 Dicas</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• O nome deve ser específico para resultados melhores</li>
                    <li>• A IA vai pesquisar preços e especificações na web</li>
                    <li>• Após gerar, você pode editar tudo manualmente</li>
                    <li>• Links de afiliado precisam ser adicionados depois</li>
                </ul>
            </div>
        </div>
    );
}
