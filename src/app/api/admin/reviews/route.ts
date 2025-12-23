import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const REVIEWS_DIR = path.join(process.cwd(), "content/reviews");

// GET - List all reviews
export async function GET() {
    try {
        if (!fs.existsSync(REVIEWS_DIR)) {
            return NextResponse.json({ reviews: [] });
        }

        const entries = fs.readdirSync(REVIEWS_DIR, { withFileTypes: true });
        const reviews = [];

        for (const entry of entries) {
            if (!entry.isDirectory()) continue;

            const metaPath = path.join(REVIEWS_DIR, entry.name, "meta.json");
            const mdxPath = path.join(REVIEWS_DIR, entry.name, "index.mdx");

            if (fs.existsSync(metaPath) && fs.existsSync(mdxPath)) {
                const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
                reviews.push({
                    slug: entry.name,
                    meta,
                });
            }
        }

        return NextResponse.json({ reviews });
    } catch (error) {
        console.error("Error listing reviews:", error);
        return NextResponse.json({ error: "Failed to list reviews" }, { status: 500 });
    }
}

// POST - Create new review via AI
export async function POST(request: NextRequest) {
    try {
        const { productName } = await request.json();

        if (!productName) {
            return NextResponse.json({ error: "Product name is required" }, { status: 400 });
        }

        // Run the new-review script
        const { stdout, stderr } = await execAsync(
            `npx tsx scripts/new-review.ts "${productName}"`,
            { cwd: process.cwd() }
        );

        if (stderr && !stderr.includes("ExperimentalWarning")) {
            console.error("Script stderr:", stderr);
        }

        // Extract slug from product name
        const slug = productName
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        return NextResponse.json({
            success: true,
            slug,
            message: "Review created successfully"
        });
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({
            error: "Failed to create review",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
