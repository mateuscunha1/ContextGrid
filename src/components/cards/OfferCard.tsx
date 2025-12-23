import { ExternalLink, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  title: string;
  description: string;
  image: string;
  store: string;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  tags?: string[];
  isRecommended?: boolean;
  className?: string;
}

export function OfferCard({
  title,
  description,
  image,
  store,
  originalPrice,
  currentPrice,
  discount,
  tags = [],
  isRecommended = false,
  className,
}: OfferCardProps) {
  return (
    <div
      className={cn(
        "bento-card overflow-hidden flex flex-col h-full relative",
        className
      )}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase bg-destructive text-destructive-foreground">
            Recomendado
          </span>
        </div>
      )}

      {/* Discount badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-destructive text-destructive-foreground">
          -{discount}%
        </span>
      </div>

      {/* Image */}
      <div className="aspect-square bg-muted flex items-center justify-center p-6">
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Store */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <Store className="size-3" />
          <span>{store}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base mb-1 line-clamp-2">{title}</h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xs text-muted-foreground line-through">
            R$ {originalPrice.toLocaleString("pt-BR")}
          </span>
          <span className="text-xl font-bold text-success">
            R$ {currentPrice.toLocaleString("pt-BR")}
          </span>
        </div>

        {/* Tags & CTA */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button size="sm" className="btn-cta px-4 py-2 text-xs">
            Pegar Oferta
            <ExternalLink className="size-3 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
