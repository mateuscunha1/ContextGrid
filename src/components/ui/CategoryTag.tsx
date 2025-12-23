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

interface CategoryTagProps {
  category: CategoryType;
  label?: string;
  className?: string;
}

const categoryConfig: Record<CategoryType, { bg: string; text: string; defaultLabel: string }> = {
  windows: {
    bg: "bg-primary/10",
    text: "text-primary",
    defaultLabel: "WINDOWS",
  },
  apple: {
    bg: "bg-foreground/10",
    text: "text-foreground",
    defaultLabel: "APPLE",
  },
  ultrabooks: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-400",
    defaultLabel: "ULTRABOOKS",
  },
  gaming: {
    bg: "bg-success/10",
    text: "text-success",
    defaultLabel: "GAMING",
  },
  mobile: {
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    defaultLabel: "MOBILE",
  },
  audio: {
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    defaultLabel: "ÁUDIO",
  },
  peripherals: {
    bg: "bg-pink-500/10",
    text: "text-pink-600 dark:text-pink-400",
    defaultLabel: "PERIFÉRICOS",
  },
  monitors: {
    bg: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    defaultLabel: "MONITORES",
  },
  budget: {
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    defaultLabel: "BUDGET",
  },
  innovation: {
    bg: "bg-teal-500/10",
    text: "text-teal-600 dark:text-teal-400",
    defaultLabel: "INOVAÇÃO",
  },
};

export function CategoryTag({ category, label, className }: CategoryTagProps) {
  const config = categoryConfig[category];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider",
        config.bg,
        config.text,
        className
      )}
    >
      {label || config.defaultLabel}
    </span>
  );
}
