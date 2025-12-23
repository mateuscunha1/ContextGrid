"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Rocket,
    ChevronLeft,
    Settings,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Reviews",
        href: "/admin/reviews",
        icon: FileText,
    },
    {
        title: "Subscribers",
        href: "/admin/subscribers",
        icon: Users,
    },
    {
        title: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
    },
    {
        title: "Publicar",
        href: "/admin/publish",
        icon: Rocket,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronLeft className="size-4" />
                    Voltar ao site
                </Link>
                <h1 className="text-xl font-black mt-3">
                    <span className="bg-foreground text-background px-2 py-0.5">Admin</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== "/admin" && pathname.startsWith(item.href));

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-foreground text-background"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    <item.icon className="size-4" />
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Settings className="size-3" />
                    <span>Modo Desenvolvimento</span>
                </div>
            </div>
        </aside>
    );
}
