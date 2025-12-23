import { Cpu, Monitor, HardDrive, Zap, MemoryStick, Battery, Wifi, Weight } from "lucide-react";
import { ReviewMeta } from "@/types/content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    cpu: Cpu,
    monitor: Monitor,
    "hard-drive": HardDrive,
    gpu: Zap,
    memory: MemoryStick,
    battery: Battery,
    wifi: Wifi,
    weight: Weight,
};

interface SpecsTableProps {
    meta: ReviewMeta;
}

export function SpecsTable({ meta }: SpecsTableProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 my-8">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Cpu className="size-5 text-primary" />
                Especificações Técnicas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {meta.specs.map((spec, idx) => {
                    const Icon = iconMap[spec.icon] || Cpu;
                    return (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon className="size-5 text-primary" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                    {spec.label}
                                </span>
                                <p className="font-medium truncate">{spec.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
