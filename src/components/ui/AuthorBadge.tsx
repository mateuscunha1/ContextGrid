import { cn } from "@/lib/utils";

interface AuthorBadgeProps {
  name: string;
  avatar?: string;
  role?: string;
  showBadge?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function AuthorBadge({
  name,
  avatar,
  role,
  showBadge = false,
  size = "md",
  className,
}: AuthorBadgeProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className={cn(
              "rounded-full border-2 border-card shadow-md object-cover",
              size === "sm" ? "size-8" : "size-10"
            )}
          />
        ) : (
          <div
            className={cn(
              "rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold border-2 border-card",
              size === "sm" ? "size-8 text-xs" : "size-10 text-sm"
            )}
          >
            {initials}
          </div>
        )}
        {showBadge && (
          <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full border border-card font-bold">
            PRO
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className={cn("font-bold", size === "sm" ? "text-xs" : "text-sm")}>{name}</span>
        {role && (
          <span className={cn("text-muted-foreground", size === "sm" ? "text-[10px]" : "text-xs")}>
            {role}
          </span>
        )}
      </div>
    </div>
  );
}
