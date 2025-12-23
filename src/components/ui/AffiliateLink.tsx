"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useAffiliateClick } from "@/hooks/useAffiliateClick";

interface AffiliateLinkProps {
    href: string;
    store: string;
    productName: string;
    price: number;
    children: ReactNode;
    className?: string;
}

export function AffiliateLink({
    href,
    store,
    productName,
    price,
    children,
    className,
}: AffiliateLinkProps) {
    const pathname = usePathname();
    const { trackClick } = useAffiliateClick();

    const handleClick = () => {
        trackClick({
            productName,
            store,
            price,
            url: href,
            source: pathname,
        });
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={className}
        >
            {children}
        </a>
    );
}
