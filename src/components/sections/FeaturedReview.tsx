import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthorBadge } from "@/components/ui/AuthorBadge";

interface FeaturedReviewProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
}

export function FeaturedReview({
  id,
  title,
  excerpt,
  image,
  category,
  date,
  author,
}: FeaturedReviewProps) {
  return (
    <div className="bento-card overflow-hidden">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="relative bg-gradient-to-br from-muted to-muted/50 p-6 flex items-center justify-center min-h-[280px]">
          {/* Featured badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary text-primary-foreground text-xs font-bold uppercase">
              <Sparkles className="size-3" />
              Review em Destaque
            </span>
          </div>
          <img
            src={image}
            alt={title}
            className="max-h-[220px] object-contain drop-shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-center">
          {/* Meta */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            <span className="text-primary">{category}</span>
            <span>•</span>
            <span>{date}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-6 line-clamp-3">{excerpt}</p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <Link href={`/reviews/${id}`}>
              <Button className="btn-cta">
                Ler Review
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>

            <AuthorBadge
              name={author.name}
              role={author.role}
              avatar={author.avatar}
              showBadge
            />
          </div>
        </div>
      </div>
    </div>
  );
}
