"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  variant?: "dark" | "light" | "gold";
  className?: string;
}

export function Newsletter({ variant = "dark", className }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Inscrito com sucesso! 🎉");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Erro ao inscrever");
      }
    } catch {
      setStatus("error");
      setMessage("Erro de conexão");
    }
  };

  const isDark = variant === "dark";
  const isGold = variant === "gold";

  return (
    <section
      className={cn(
        "py-12 px-6 rounded-2xl",
        isDark && "bg-foreground text-background",
        isGold && "bg-gold text-gold-foreground",
        !isDark && !isGold && "bg-card border border-border",
        className
      )}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div
          className={cn(
            "inline-flex items-center justify-center size-14 rounded-full mb-6",
            isDark && "bg-background/10",
            isGold && "bg-gold-foreground/10",
            !isDark && !isGold && "bg-primary/10"
          )}
        >
          <Mail
            className={cn(
              "size-7",
              isDark && "text-background",
              isGold && "text-gold-foreground",
              !isDark && !isGold && "text-primary"
            )}
          />
        </div>

        <h3 className="text-2xl font-bold mb-3">Tech Sem Enrolação</h3>

        <p
          className={cn(
            "mb-8",
            isDark && "text-background/70",
            isGold && "text-gold-foreground/80",
            !isDark && !isGold && "text-muted-foreground"
          )}
        >
          Receba as melhores ofertas, reviews honestos e guias direto na sua
          caixa de entrada toda sexta-feira. Sem spam, prometemos.
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 text-green-500 font-medium">
            <Check className="size-5" />
            {message}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className={cn(
                "flex-1",
                isDark && "bg-background/10 border-background/20 text-background placeholder:text-background/50",
                isGold && "bg-gold-foreground/10 border-gold-foreground/20 text-gold-foreground placeholder:text-gold-foreground/50"
              )}
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "font-bold",
                isDark && "bg-background text-foreground hover:bg-background/90",
                isGold && "bg-gold-foreground text-gold hover:bg-gold-foreground/90",
                !isDark && !isGold && "btn-cta"
              )}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Inscrevendo...
                </>
              ) : (
                <>
                  Inscrever-se
                  <ArrowRight className="size-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm mt-2">{message}</p>
        )}
      </div>
    </section>
  );
}
