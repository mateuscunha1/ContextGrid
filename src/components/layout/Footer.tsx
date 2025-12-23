import Link from "next/link";
import { Grid3X3 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <Grid3X3 className="size-5" />
            </div>
            <span className="text-xl font-bold">ContextGrid</span>
          </Link>

          {/* Tagline */}
          <p className="text-muted-foreground max-w-md mb-6">
            Reviews de tecnologia diretos ao ponto, sem enrolação. Feito por entusiastas para entusiastas.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 mb-8">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              YouTube
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Telegram
            </a>
          </div>

          {/* Affiliate Disclaimer */}
          <p className="text-xs text-muted-foreground mb-2">
            Este site contém links de afiliados.{" "}
            <Link href="/legal" className="underline hover:text-foreground">
              Saiba mais
            </Link>
          </p>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 ContextGrid. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
