import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number;
  className?: string;
  size?: "sm" | "md";
}

export function RatingBadge({ rating, className, size = "md" }: RatingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md font-bold",
        "bg-gradient-to-r from-gold to-amber-400 text-gold-foreground",
        size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-sm",
        className
      )}
    >
      {rating.toFixed(1)}
      <Star className={cn("fill-current", size === "sm" ? "size-3" : "size-4")} />
    </span>
  );
}
