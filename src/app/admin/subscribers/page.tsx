"use client";

import { useEffect, useState } from "react";
import { Users, Mail, Calendar, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Subscriber {
    email: string;
    subscribedAt: string;
}

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const response = await fetch("/api/newsletter");
            const data = await response.json();
            setSubscribers(data.subscribers || []);
        } catch (error) {
            console.error("Error fetching subscribers:", error);
        } finally {
            setLoading(false);
        }
    };

    const exportCSV = () => {
        const csv = [
            "Email,Data de Inscrição",
            ...subscribers.map((s) => `${s.email},${s.subscribedAt}`),
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Subscribers</h1>
                    <p className="text-muted-foreground">
                        Gerencie os inscritos da newsletter
                    </p>
                </div>
                <Button onClick={exportCSV} disabled={subscribers.length === 0}>
                    <Download className="size-4 mr-2" />
                    Exportar CSV
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bento-card p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Users className="size-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{subscribers.length}</p>
                            <p className="text-sm text-muted-foreground">Total Inscritos</p>
                        </div>
                    </div>
                </div>
                <div className="bento-card p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-green-500/10 rounded-lg">
                            <Mail className="size-5 text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {subscribers.filter((s) => {
                                    const date = new Date(s.subscribedAt);
                                    const now = new Date();
                                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                                }).length}
                            </p>
                            <p className="text-sm text-muted-foreground">Este Mês</p>
                        </div>
                    </div>
                </div>
                <div className="bento-card p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <Calendar className="size-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {subscribers.length > 0
                                    ? new Date(subscribers[subscribers.length - 1].subscribedAt).toLocaleDateString("pt-BR")
                                    : "-"}
                            </p>
                            <p className="text-sm text-muted-foreground">Último Inscrito</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bento-card overflow-hidden">
                <div className="p-4 border-b border-border">
                    <h2 className="font-bold">Lista de Inscritos</h2>
                </div>
                {loading ? (
                    <div className="p-8 text-center text-muted-foreground">
                        Carregando...
                    </div>
                ) : subscribers.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                        Nenhum inscrito ainda
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {subscribers.map((subscriber, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 hover:bg-muted/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Mail className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{subscriber.email}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Inscrito em {new Date(subscriber.subscribedAt).toLocaleDateString("pt-BR")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
