import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const REVIEWS_DIR = path.join(process.cwd(), "content/reviews");

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// GET - Get single review
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params;
        const reviewDir = path.join(REVIEWS_DIR, slug);
        const metaPath = path.join(reviewDir, "meta.json");
        const mdxPath = path.join(reviewDir, "index.mdx");

        if (!fs.existsSync(metaPath) || !fs.existsSync(mdxPath)) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
        const content = fs.readFileSync(mdxPath, "utf-8");

        return NextResponse.json({ slug, meta, content });
    } catch (error) {
        console.error("Error getting review:", error);
        return NextResponse.json({ error: "Failed to get review" }, { status: 500 });
    }
}

// PUT - Update review
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params;
        const { meta, content } = await request.json();

        const reviewDir = path.join(REVIEWS_DIR, slug);
        const metaPath = path.join(reviewDir, "meta.json");
        const mdxPath = path.join(reviewDir, "index.mdx");

        if (!fs.existsSync(reviewDir)) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        // Update meta.json
        if (meta) {
            fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf-8");
        }

        // Update index.mdx
        if (content) {
            fs.writeFileSync(mdxPath, content, "utf-8");
        }

        return NextResponse.json({ success: true, message: "Review updated" });
    } catch (error) {
        console.error("Error updating review:", error);
        return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
    }
}

// DELETE - Delete review
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params;
        const reviewDir = path.join(REVIEWS_DIR, slug);

        if (!fs.existsSync(reviewDir)) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        // Remove directory recursively
        fs.rmSync(reviewDir, { recursive: true, force: true });

        return NextResponse.json({ success: true, message: "Review deleted" });
    } catch (error) {
        console.error("Error deleting review:", error);
        return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }
}
