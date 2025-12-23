import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ReviewMeta, ReviewFrontmatter, Review } from "@/types/content";

const REVIEWS_DIR = path.join(process.cwd(), "content/reviews");

export async function getReviewSlugs(): Promise<string[]> {
    if (!fs.existsSync(REVIEWS_DIR)) return [];

    const entries = fs.readdirSync(REVIEWS_DIR, { withFileTypes: true });
    return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
}

export async function getReview(slug: string): Promise<Review | null> {
    const reviewDir = path.join(REVIEWS_DIR, slug);
    const mdxPath = path.join(reviewDir, "index.mdx");
    const metaPath = path.join(reviewDir, "meta.json");

    if (!fs.existsSync(mdxPath) || !fs.existsSync(metaPath)) {
        return null;
    }

    const mdxContent = fs.readFileSync(mdxPath, "utf-8");
    const { data, content } = matter(mdxContent);
    const frontmatter = data as ReviewFrontmatter;

    const metaContent = fs.readFileSync(metaPath, "utf-8");
    const meta = JSON.parse(metaContent) as ReviewMeta;

    return {
        slug,
        frontmatter,
        content,
        meta,
    };
}

export async function getAllReviews(): Promise<Review[]> {
    const slugs = await getReviewSlugs();
    const reviews = await Promise.all(
        slugs.map(async (slug) => {
            const review = await getReview(slug);
            return review;
        })
    );
    return reviews.filter((r): r is Review => r !== null);
}

export async function getReviewBySlug(slug: string) {
    return getReview(slug);
}

// Helper functions for pages

export async function getFeaturedReview(): Promise<Review | null> {
    const reviews = await getAllReviews();
    // Return review with editor badge, or highest rating, or first one
    const editorPick = reviews.find((r) => r.frontmatter.badge === "editor");
    if (editorPick) return editorPick;

    // Sort by rating and return highest
    const sorted = reviews.sort(
        (a, b) => b.frontmatter.rating - a.frontmatter.rating
    );
    return sorted[0] || null;
}

export async function getLatestReviews(limit = 6): Promise<Review[]> {
    const reviews = await getAllReviews();
    return reviews
        .sort(
            (a, b) =>
                new Date(b.frontmatter.publishedAt).getTime() -
                new Date(a.frontmatter.publishedAt).getTime()
        )
        .slice(0, limit);
}

export async function getReviewsByCategory(category: string): Promise<Review[]> {
    const reviews = await getAllReviews();
    return reviews.filter((r) => r.frontmatter.category === category);
}

export async function getDeals(): Promise<Review[]> {
    const reviews = await getAllReviews();
    return reviews.filter((r) => r.meta.deal?.active);
}

export async function getCategories(): Promise<string[]> {
    const reviews = await getAllReviews();
    const categories = new Set(reviews.map((r) => r.frontmatter.category));
    return Array.from(categories);
}
