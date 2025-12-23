"use client";

import { useState } from "react";
import { Rocket, Loader2, Check, AlertCircle, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PublishPage() {
    const [isPublishing, setIsPublishing] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const handlePublish = async () => {
        setIsPublishing(true);
        setResult(null);

        try {
            const response = await fetch("/api/admin/publish", {
                method: "POST",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to publish");
            }

            setResult({ success: true, message: data.message || "Publicado com sucesso!" });
        } catch (err) {
            setResult({
                success: false,
                message: err instanceof Error ? err.message : "Erro ao publicar",
            });
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center size-16 bg-primary/10 rounded-2xl mb-4">
                    <Rocket className="size-8 text-primary" />
                </div>
                <h1 className="text-3xl font-black mb-2">Publicar</h1>
                <p className="text-muted-foreground">
                    Publique suas alterações no site de produção
                </p>
            </div>

            {/* Status Card */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <GitBranch className="size-5 text-muted-foreground" />
                    <span className="font-medium">Status do Git</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    Ao clicar em Publicar, o sistema irá:
                </p>
                <ol className="text-sm text-muted-foreground mt-3 space-y-1 list-decimal list-inside">
                    <li>Adicionar todas as alterações (git add .)</li>
                    <li>Fazer um commit com a data atual</li>
                    <li>Enviar para o repositório (git push)</li>
                </ol>
            </div>

            {/* Result Message */}
            {result && (
                <div
                    className={`rounded-xl p-4 mb-6 flex items-center gap-3 ${result.success
                            ? "bg-success/10 border border-success/30 text-success"
                            : "bg-destructive/10 border border-destructive/30 text-destructive"
                        }`}
                >
                    {result.success ? (
                        <Check className="size-5" />
                    ) : (
                        <AlertCircle className="size-5" />
                    )}
                    <span>{result.message}</span>
                </div>
            )}

            {/* Publish Button */}
            <Button
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full btn-cta py-6 text-lg"
            >
                {isPublishing ? (
                    <>
                        <Loader2 className="size-5 mr-2 animate-spin" />
                        Publicando...
                    </>
                ) : (
                    <>
                        <Rocket className="size-5 mr-2" />
                        Publicar Agora
                    </>
                )}
            </Button>

            {/* Note */}
            <p className="text-xs text-muted-foreground text-center mt-4">
                Certifique-se de que o Git está configurado e você tem permissão para push.
            </p>
        </div>
    );
}
