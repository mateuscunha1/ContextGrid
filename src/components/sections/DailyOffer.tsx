import { ExternalLink, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DailyOfferProps {
  title: string;
  image: string;
  originalPrice: number;
  currentPrice: number;
}

export function DailyOffer({
  title,
  image,
  originalPrice,
  currentPrice,
}: DailyOfferProps) {
  return (
    <div className="bg-primary rounded-xl p-4 text-primary-foreground relative overflow-hidden">
      {/* Tag icon */}
      <div className="absolute top-3 right-3">
        <Tag className="size-5 opacity-80" />
      </div>

      {/* Header */}
      <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-3">
        Oferta do Dia
      </div>

      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="bg-primary-foreground/10 rounded-lg p-2 shrink-0">
          <img src={image} alt={title} className="size-16 object-contain" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm mb-1 truncate">{title}</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">
              R$ {currentPrice.toLocaleString("pt-BR")}
            </span>
            <span className="text-xs line-through opacity-60">
              R$ {originalPrice.toLocaleString("pt-BR")}
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Button
        size="sm"
        className="w-full mt-3 bg-gold text-gold-foreground hover:bg-gold/90 font-bold"
      >
        Pegar Oferta
        <ExternalLink className="size-3 ml-2" />
      </Button>
    </div>
  );
}
