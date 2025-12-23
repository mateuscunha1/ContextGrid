import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

interface TrendingItem {
  id: string;
  category: string;
  title: string;
}

interface TrendingNowProps {
  items: TrendingItem[];
}

export function TrendingNow({ items }: TrendingNowProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-gold fill-gold" />
          <span className="font-bold text-sm">Em Alta Agora</span>
        </div>
        <Link
          href="/reviews"
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Ver tudo
        </Link>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={`/reviews/${item.id}`}
            className="block group"
          >
            <div className="flex items-start gap-3">
              <span className="text-lg font-bold text-muted-foreground/50">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {item.category}
                </span>
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
              </div>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
