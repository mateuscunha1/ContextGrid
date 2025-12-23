import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { CategoryTag } from "@/components/ui/CategoryTag";
import { cn } from "@/lib/utils";

type CategoryType =
  | "windows"
  | "apple"
  | "ultrabooks"
  | "gaming"
  | "mobile"
  | "audio"
  | "peripherals"
  | "monitors"
  | "budget"
  | "innovation";

interface ReviewCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: CategoryType;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  rating?: number;
  badge?: "editor" | "value" | null;
  isPreview?: boolean;
  className?: string;
}

export function ReviewCard({
  id,
  title,
  excerpt,
  image,
  category,
  author,
  date,
  rating,
  badge,
  isPreview = false,
  className,
}: ReviewCardProps) {
  const initials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link
      href={`/reviews/${id}`}
      className={cn(
        "group bento-card overflow-hidden flex flex-col h-full",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-muted overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <CategoryTag category={category} />
        </div>

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 mt-8">
            <span
              className={cn(
                "inline-flex items-center px-2 py-1 rounded text-xs font-bold uppercase",
                badge === "editor"
                  ? "bg-gold text-gold-foreground"
                  : "bg-success text-success-foreground"
              )}
            >
              {badge === "editor" ? "Escolha do Editor" : "Best Value"}
            </span>
          </div>
        )}

        {/* Rating */}
        {rating && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-bold bg-gradient-to-r from-gold to-amber-400 text-gold-foreground">
              {rating.toFixed(1)}
              <Star className="size-4 fill-current" />
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>{date}</span>
          {isPreview && (
            <>
              <span>•</span>
              <span className="text-primary">Preview</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          {/* Author */}
          <div className="flex items-center gap-2">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="size-6 rounded-full object-cover"
              />
            ) : (
              <div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                {initials}
              </div>
            )}
            <span className="text-xs font-medium">{author.name}</span>
          </div>

          {/* Stars */}
          {rating && (
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-3",
                    i < Math.floor(rating) ? "fill-current" : "fill-none"
                  )}
                />
              ))}
            </div>
          )}

          {/* Read more */}
          <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Ler mais
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
