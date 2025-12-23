import Link from "next/link";
import { Info } from "lucide-react";

export function AffiliateDisclosure() {
    return (
        <div className="bg-muted/50 border border-border rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
                <Info className="size-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Transparência:</strong> Este artigo contém links de afiliados.
                    Se você comprar através deles, podemos receber uma comissão sem custo
                    adicional para você.{" "}
                    <Link href="/legal" className="underline hover:text-foreground">
                        Saiba mais
                    </Link>
                </p>
            </div>
        </div>
    );
}
