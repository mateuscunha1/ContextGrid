import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST() {
    try {
        const timestamp = new Date().toISOString().split("T")[0];
        const commitMessage = `Content update ${timestamp}`;

        // Run git commands
        await execAsync("git add .", { cwd: process.cwd() });

        try {
            await execAsync(`git commit -m "${commitMessage}"`, { cwd: process.cwd() });
        } catch (commitError) {
            // If nothing to commit, that's okay
            if (!(commitError instanceof Error) || !commitError.message.includes("nothing to commit")) {
                throw commitError;
            }
            return NextResponse.json({
                success: true,
                message: "Nenhuma alteração para publicar"
            });
        }

        await execAsync("git push", { cwd: process.cwd() });

        return NextResponse.json({
            success: true,
            message: "Publicado com sucesso! O deploy será iniciado automaticamente."
        });
    } catch (error) {
        console.error("Publish error:", error);
        return NextResponse.json(
            {
                error: "Erro ao publicar",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}
