"use client";

import { useEffect, useState } from "react";
import { useAffiliateClick, ClickEvent } from "@/hooks/useAffiliateClick";
import { Button } from "@/components/ui/button";
import { BarChart3, Trash2, TrendingUp, Store, Package, DollarSign } from "lucide-react";
import Link from "next/link";

export default function AnalyticsDashboard() {
    const { getClicks, clearClicks, getStats } = useAffiliateClick();
    const [clicks, setClicks] = useState<ClickEvent[]>([]);
    const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null);

    useEffect(() => {
        setClicks(getClicks());
        setStats(getStats());
    }, [getClicks, getStats]);

    const handleClear = () => {
        clearClicks();
        setClicks([]);
        setStats(getStats());
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black flex items-center gap-3">
                    <BarChart3 className="size-8 text-primary" />
                    Analytics de Afiliados
                </h1>
                <Link href="/">
                    <Button variant="outline">← Voltar ao Site</Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="size-5 text-primary" />
                        <p className="text-sm text-muted-foreground">Total de Cliques</p>
                    </div>
                    <p className="text-4xl font-black">{stats?.totalClicks || 0}</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="size-5 text-success" />
                        <p className="text-sm text-muted-foreground">Valor Potencial</p>
                    </div>
                    <p className="text-4xl font-black text-success">
                        R$ {(stats?.totalPotential || 0).toLocaleString("pt-BR")}
                    </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Store className="size-5 text-blue-500" />
                        <p className="text-sm text-muted-foreground">Lojas Clicadas</p>
                    </div>
                    <p className="text-4xl font-black">
                        {Object.keys(stats?.byStore || {}).length}
                    </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Package className="size-5 text-orange-500" />
                        <p className="text-sm text-muted-foreground">Produtos</p>
                    </div>
                    <p className="text-4xl font-black">
                        {Object.keys(stats?.byProduct || {}).length}
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* By Store */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Store className="size-5" />
                        Cliques por Loja
                    </h2>
                    <div className="space-y-3">
                        {Object.entries(stats?.byStore || {}).map(([store, count]) => {
                            const percentage = stats?.totalClicks ? (count / stats.totalClicks) * 100 : 0;
                            return (
                                <div key={store}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">{store}</span>
                                        <span className="text-muted-foreground">{count} cliques</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        {Object.keys(stats?.byStore || {}).length === 0 && (
                            <p className="text-muted-foreground text-center py-4">
                                Nenhum clique registrado ainda
                            </p>
                        )}
                    </div>
                </div>

                {/* By Product */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Package className="size-5" />
                        Cliques por Produto
                    </h2>
                    <div className="space-y-3">
                        {Object.entries(stats?.byProduct || {}).map(([product, count]) => {
                            const percentage = stats?.totalClicks ? (count / stats.totalClicks) * 100 : 0;
                            return (
                                <div key={product}>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium truncate pr-4">{product}</span>
                                        <span className="text-muted-foreground shrink-0">{count} cliques</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-success rounded-full transition-all"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        {Object.keys(stats?.byProduct || {}).length === 0 && (
                            <p className="text-muted-foreground text-center py-4">
                                Nenhum clique registrado ainda
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Clicks */}
            <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">Últimos Cliques</h2>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClear}
                        disabled={clicks.length === 0}
                    >
                        <Trash2 className="size-4 mr-2" /> Limpar Dados
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Produto</th>
                                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Loja</th>
                                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Valor</th>
                                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Origem</th>
                                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Data/Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clicks.slice().reverse().slice(0, 20).map((click) => (
                                <tr key={click.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                                    <td className="py-3 px-2 font-medium">{click.productName}</td>
                                    <td className="py-3 px-2">
                                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                                            {click.store}
                                        </span>
                                    </td>
                                    <td className="py-3 px-2 text-right text-success font-bold">
                                        R$ {click.price.toLocaleString("pt-BR")}
                                    </td>
                                    <td className="py-3 px-2 text-muted-foreground">{click.source}</td>
                                    <td className="py-3 px-2 text-right text-muted-foreground">
                                        {new Date(click.timestamp).toLocaleString("pt-BR")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {clicks.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <BarChart3 className="size-12 mx-auto mb-2 opacity-50" />
                            <p>Nenhum clique registrado ainda</p>
                            <p className="text-sm mt-1">
                                Clique em um link de afiliado em qualquer review para começar a ver dados aqui
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>Os dados são armazenados localmente no navegador (localStorage).</p>
                <p>Para persistência permanente, integre com um banco de dados ou Google Analytics.</p>
            </div>
        </div>
    );
}
