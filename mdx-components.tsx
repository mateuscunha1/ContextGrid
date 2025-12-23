import type { MDXComponents } from "mdx/types";

// Note: MDX components need to receive meta/frontmatter props from the page
// They are registered here for MDX to recognize them as valid components
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Custom wrapper components will be passed props from the review page
        // Standard HTML elements can be customized here if needed
        h1: ({ children }) => (
            <h1 className="text-3xl font-black mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center gap-2">
                <span className="text-primary">#</span> {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
        ),
        p: ({ children }) => (
            <p className="mb-4 leading-relaxed">{children}</p>
        ),
        strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
        ),
        ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
        ),
        ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                {children}
            </blockquote>
        ),
        ...components,
    };
}
