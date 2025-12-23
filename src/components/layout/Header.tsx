"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Search, Menu, X, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const navItems = [
  { label: "Reviews", href: "/reviews" },
  { label: "Guias", href: "/guias" },
  { label: "Ofertas", href: "/ofertas" },
  { label: "Sobre", href: "/sobre" },
];

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isActive = (href: string) => {
    if (href === "/reviews") {
      return pathname.startsWith("/reviews") || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-neobrutal-sm border border-foreground dark:border-primary-foreground transition-all group-hover:translate-y-[1px] group-hover:shadow-none">
              <Grid3X3 className="size-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight border-b-2 border-transparent group-hover:border-foreground transition-all">
              ContextGrid
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${isActive(item.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="rounded-full"
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )
              ) : (
                <div className="size-5" /> // Placeholder while mounting
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex rounded-full"
              aria-label="Buscar"
            >
              <Search className="size-5" />
            </Button>

            <Button className="hidden sm:flex px-4 py-2 bg-foreground text-background font-bold rounded-lg shadow-neobrutal-sm hover:translate-y-[1px] hover:shadow-none transition-all border border-transparent">
              Inscrever-se
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold py-2 transition-colors ${isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="w-full mt-2 bg-foreground text-background font-bold">
                Inscrever-se
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
