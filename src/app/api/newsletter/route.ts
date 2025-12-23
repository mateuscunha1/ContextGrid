import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "content", "subscribers.json");

// Ensure the file exists
function ensureFile() {
    if (!fs.existsSync(SUBSCRIBERS_FILE)) {
        fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify({ subscribers: [] }, null, 2));
    }
}

// GET: List all subscribers (for admin)
export async function GET() {
    try {
        ensureFile();
        const data = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf-8"));
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to read subscribers" }, { status: 500 });
    }
}

// POST: Add a new subscriber
export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes("@")) {
            return NextResponse.json({ error: "Email inválido" }, { status: 400 });
        }

        ensureFile();
        const data = JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf-8"));

        // Check if already subscribed
        if (data.subscribers.some((s: { email: string }) => s.email === email)) {
            return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 });
        }

        // Add new subscriber
        data.subscribers.push({
            email,
            subscribedAt: new Date().toISOString(),
        });

        fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, message: "Inscrito com sucesso!" });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao salvar email" }, { status: 500 });
    }
}
