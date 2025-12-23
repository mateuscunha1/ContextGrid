"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Save,
    Loader2,
    FileText,
    DollarSign,
    Settings,
    Check,
    X,
    Plus,
    Trash2,
    ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ReviewData {
    slug: string;
    meta: {
        product: {
            name: string;
            image: string;
            brand: string;
        };
        specs: Record<string, string>;
        pros: string[];
        cons: string[];
        prices: Record<string, { price: number; originalPrice?: number; url: string }>;
        deal?: { active: boolean; badge?: string; expiresAt?: string };
    };
    content: string;
}

interface EditPageProps {
    params: Promise<{ slug: string }>;
}

export default function EditReviewPage({ params }: EditPageProps) {
    const router = useRouter();
    const [slug, setSlug] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"content" | "prices" | "specs" | "proscons">("content");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState("");

    // Form state
    const [content, setContent] = useState("");
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [specs, setSpecs] = useState<Record<string, string>>({});
    const [pros, setPros] = useState<string[]>([]);
    const [cons, setCons] = useState<string[]>([]);
    const [prices, setPrices] = useState<Record<string, { price: number; originalPrice?: number; url: string }>>({});
    const [dealActive, setDealActive] = useState(false);

    // Load review data
    useEffect(() => {
        async function loadReview() {
            const { slug: reviewSlug } = await params;
            setSlug(reviewSlug);

            try {
                const response = await fetch(`/api/admin/reviews/${reviewSlug}`);
                if (!response.ok) throw new Error("Review not found");

                const data: ReviewData = await response.json();

                setContent(data.content);
                setProductName(data.meta.product.name);
                setProductImage(data.meta.product.image);
                setProductBrand(data.meta.product.brand);
                setSpecs(data.meta.specs || {});
                setPros(data.meta.pros || []);
                setCons(data.meta.cons || []);
                setPrices(data.meta.prices || {});
                setDealActive(data.meta.deal?.active || false);
            } catch (err) {
                setError("Erro ao carregar review");
            } finally {
                setIsLoading(false);
            }
        }

        loadReview();
    }, [params]);

    // Save handler
    const handleSave = async () => {
        setIsSaving(true);
        setSaveSuccess(false);
        setError("");

        try {
            const response = await fetch(`/api/admin/reviews/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    meta: {
                        product: {
                            name: productName,
                            image: productImage,
                            brand: productBrand,
                        },
                        specs,
                        pros,
                        cons,
                        prices,
                        deal: { active: dealActive },
                    },
                    content,
                }),
            });

            if (!response.ok) throw new Error("Failed to save");

            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            setError("Erro ao salvar");
        } finally {
            setIsSaving(false);
        }
    };

    // Price handlers
    const addPrice = () => {
        const storeName = prompt("Nome da loja (ex: amazon, kabum):");
        if (storeName) {
            setPrices((prev) => ({
                ...prev,
                [storeName.toLowerCase()]: { price: 0, url: "" },
            }));
        }
    };

    const removePrice = (store: string) => {
        setPrices((prev) => {
            const newPrices = { ...prev };
            delete newPrices[store];
            return newPrices;
        });
    };

    // Spec handlers
    const addSpec = () => {
        const specName = prompt("Nome da especificação (ex: Processador):");
        if (specName) {
            setSpecs((prev) => ({ ...prev, [specName]: "" }));
        }
    };

    const removeSpec = (key: string) => {
        setSpecs((prev) => {
            const newSpecs = { ...prev };
            delete newSpecs[key];
            return newSpecs;
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const tabs = [
        { id: "content", label: "Conteúdo", icon: FileText },
        { id: "prices", label: "Preços", icon: DollarSign },
        { id: "specs", label: "Specs", icon: Settings },
        { id: "proscons", label: "Prós/Contras", icon: Check },
    ] as const;

    return (
        <div className="max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/reviews"
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                        <ArrowLeft className="size-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black">Editar Review</h1>
                        <p className="text-sm text-muted-foreground">{slug}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link href={`/reviews/${slug}`} target="_blank">
                        <Button variant="outline" size="sm">
                            <ExternalLink className="size-4 mr-2" />
                            Ver
                        </Button>
                    </Link>
                    <Button onClick={handleSave} disabled={isSaving} className="btn-cta">
                        {isSaving ? (
                            <Loader2 className="size-4 mr-2 animate-spin" />
                        ) : saveSuccess ? (
                            <Check className="size-4 mr-2" />
                        ) : (
                            <Save className="size-4 mr-2" />
                        )}
                        {saveSuccess ? "Salvo!" : "Salvar"}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-6 text-destructive text-sm">
                    {error}
                </div>
            )}

            {/* Product Info Bar */}
            <div className="bg-card border border-border rounded-xl p-4 mb-6 flex items-center gap-4">
                <img
                    src={productImage}
                    alt={productName}
                    className="size-16 object-cover rounded-lg bg-muted"
                />
                <div className="flex-1">
                    <Input
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="font-bold text-lg border-none p-0 h-auto"
                        placeholder="Nome do produto"
                    />
                    <Input
                        value={productBrand}
                        onChange={(e) => setProductBrand(e.target.value)}
                        className="text-sm text-muted-foreground border-none p-0 h-auto mt-1"
                        placeholder="Marca"
                    />
                </div>
                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={dealActive}
                        onChange={(e) => setDealActive(e.target.checked)}
                        className="rounded"
                    />
                    Oferta ativa
                </label>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-border mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                ? "border-primary text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        <tab.icon className="size-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-card border border-border rounded-xl p-6">
                {/* Content Tab */}
                {activeTab === "content" && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="font-medium">Conteúdo MDX</label>
                            <span className="text-xs text-muted-foreground">
                                Suporta Markdown
                            </span>
                        </div>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="min-h-[500px] font-mono text-sm"
                            placeholder="Escreva o conteúdo do review..."
                        />
                    </div>
                )}

                {/* Prices Tab */}
                {activeTab === "prices" && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="font-medium">Preços por Loja</label>
                            <Button variant="outline" size="sm" onClick={addPrice}>
                                <Plus className="size-4 mr-2" />
                                Adicionar Loja
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(prices).map(([store, data]) => (
                                <div
                                    key={store}
                                    className="grid grid-cols-12 gap-3 items-center p-4 bg-muted/50 rounded-lg"
                                >
                                    <div className="col-span-2">
                                        <span className="font-medium capitalize">{store}</span>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs text-muted-foreground">Preço</label>
                                        <Input
                                            type="number"
                                            value={data.price}
                                            onChange={(e) =>
                                                setPrices((prev) => ({
                                                    ...prev,
                                                    [store]: { ...prev[store], price: Number(e.target.value) },
                                                }))
                                            }
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs text-muted-foreground">Original</label>
                                        <Input
                                            type="number"
                                            value={data.originalPrice || ""}
                                            onChange={(e) =>
                                                setPrices((prev) => ({
                                                    ...prev,
                                                    [store]: {
                                                        ...prev[store],
                                                        originalPrice: e.target.value ? Number(e.target.value) : undefined,
                                                    },
                                                }))
                                            }
                                            placeholder="Opcional"
                                        />
                                    </div>
                                    <div className="col-span-5">
                                        <label className="text-xs text-muted-foreground">URL Afiliado</label>
                                        <Input
                                            value={data.url}
                                            onChange={(e) =>
                                                setPrices((prev) => ({
                                                    ...prev,
                                                    [store]: { ...prev[store], url: e.target.value },
                                                }))
                                            }
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="col-span-1 flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removePrice(store)}
                                            className="text-destructive"
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {Object.keys(prices).length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>Nenhuma loja adicionada</p>
                                    <Button variant="link" onClick={addPrice}>
                                        Adicionar primeira loja
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Specs Tab */}
                {activeTab === "specs" && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="font-medium">Especificações Técnicas</label>
                            <Button variant="outline" size="sm" onClick={addSpec}>
                                <Plus className="size-4 mr-2" />
                                Adicionar Spec
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {Object.entries(specs).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-3">
                                    <div className="w-1/3">
                                        <span className="text-sm font-medium">{key}</span>
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            value={value}
                                            onChange={(e) =>
                                                setSpecs((prev) => ({ ...prev, [key]: e.target.value }))
                                            }
                                            placeholder="Valor"
                                        />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeSpec(key)}
                                        className="text-destructive"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            ))}

                            {Object.keys(specs).length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>Nenhuma especificação adicionada</p>
                                    <Button variant="link" onClick={addSpec}>
                                        Adicionar primeira spec
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Pros/Cons Tab */}
                {activeTab === "proscons" && (
                    <div className="grid grid-cols-2 gap-6">
                        {/* Pros */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="font-medium text-success flex items-center gap-2">
                                    <Check className="size-4" />
                                    Prós
                                </label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPros((prev) => [...prev, ""])}
                                >
                                    <Plus className="size-4" />
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {pros.map((pro, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input
                                            value={pro}
                                            onChange={(e) =>
                                                setPros((prev) =>
                                                    prev.map((p, i) => (i === index ? e.target.value : p))
                                                )
                                            }
                                            placeholder="Ponto positivo"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                setPros((prev) => prev.filter((_, i) => i !== index))
                                            }
                                            className="text-destructive"
                                        >
                                            <X className="size-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cons */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="font-medium text-destructive flex items-center gap-2">
                                    <X className="size-4" />
                                    Contras
                                </label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCons((prev) => [...prev, ""])}
                                >
                                    <Plus className="size-4" />
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {cons.map((con, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input
                                            value={con}
                                            onChange={(e) =>
                                                setCons((prev) =>
                                                    prev.map((c, i) => (i === index ? e.target.value : c))
                                                )
                                            }
                                            placeholder="Ponto negativo"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                setCons((prev) => prev.filter((_, i) => i !== index))
                                            }
                                            className="text-destructive"
                                        >
                                            <X className="size-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
