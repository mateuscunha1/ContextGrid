"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface CommentsProps {
    term?: string; // Usually the page slug or URL
}

export function Comments({ term }: CommentsProps) {
    const { resolvedTheme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear existing iframe
        containerRef.current.innerHTML = "";

        // Create Giscus script
        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.setAttribute("data-repo", "mateuscunha1/ContextGrid");
        script.setAttribute("data-repo-id", ""); // User needs to fill this
        script.setAttribute("data-category", "Announcements");
        script.setAttribute("data-category-id", ""); // User needs to fill this
        script.setAttribute("data-mapping", "pathname");
        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "top");
        script.setAttribute("data-theme", resolvedTheme === "dark" ? "dark" : "light");
        script.setAttribute("data-lang", "pt");
        script.setAttribute("data-loading", "lazy");
        script.crossOrigin = "anonymous";
        script.async = true;

        containerRef.current.appendChild(script);
    }, [resolvedTheme, term]);

    return (
        <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Comentários</h2>
            <div ref={containerRef} className="giscus-container" />
        </section>
    );
}
