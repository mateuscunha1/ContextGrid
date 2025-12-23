import { Check, X } from "lucide-react";
import { ReviewMeta } from "@/types/content";

interface ProsConsProps {
    meta: ReviewMeta;
}

export function ProsCons({ meta }: ProsConsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {/* Pros */}
            <div className="bg-success-muted border border-success/20 rounded-xl p-6">
                <h4 className="font-bold text-success text-lg mb-4 flex items-center gap-2">
                    <Check className="size-5" /> O Que Amamos
                </h4>
                <ul className="space-y-3">
                    {meta.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="size-4 text-success shrink-0 mt-0.5" />
                            <span>{pro}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cons */}
            <div className="bg-destructive-muted border border-destructive/20 rounded-xl p-6">
                <h4 className="font-bold text-destructive text-lg mb-4 flex items-center gap-2">
                    <X className="size-5" /> Onde Pode Melhorar
                </h4>
                <ul className="space-y-3">
                    {meta.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <X className="size-4 text-destructive shrink-0 mt-0.5" />
                            <span>{con}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
