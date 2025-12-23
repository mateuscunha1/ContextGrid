#!/usr/bin/env node
/**
 * ContextGrid - AI Review Generator
 * 
 * Usa Gemini 3 Flash Preview com Google Search para pesquisar
 * e gerar reviews completos automaticamente.
 * 
 * Uso: npm run new-review "Nome do Produto"
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// Configuração
const MODEL_NAME = "gemini-2.0-flash";
const CONTENT_DIR = path.join(process.cwd(), "content", "reviews");

// Interface para input do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function ask(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

async function generateReview(productName: string) {
    console.log("\n🤖 ContextGrid AI Review Generator\n");
    console.log(`📦 Produto: ${productName}\n`);

    // Verificar API key
    const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("❌ Erro: GOOGLE_API_KEY ou GEMINI_API_KEY não encontrada.");
        console.log("\nConfigure a variável de ambiente:");
        console.log('  $env:GOOGLE_API_KEY = "sua-chave-aqui"');
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 8192,
        },
    });

    const slug = slugify(productName);
    const reviewDir = path.join(CONTENT_DIR, slug);

    // Verificar se já existe
    if (fs.existsSync(reviewDir)) {
        const overwrite = await ask(`⚠️  Review "${slug}" já existe. Sobrescrever? (s/n): `);
        if (overwrite.toLowerCase() !== "s") {
            console.log("Operação cancelada.");
            rl.close();
            return;
        }
    }

    console.log("🔍 Pesquisando informações do produto...\n");

    // Prompt para gerar o meta.json
    const metaPrompt = `
Você é um especialista em tecnologia brasileiro. Pesquise sobre o produto "${productName}" e gere um JSON com as especificações técnicas.

IMPORTANTE: Use Google Search para buscar informações atuais e precisas sobre este produto.

Retorne APENAS um JSON válido (sem markdown, sem \`\`\`) no seguinte formato:

{
  "product": {
    "name": "Nome completo do produto",
    "brand": "Marca",
    "model": "Modelo",
    "image": "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600"
  },
  "specs": [
    { "icon": "cpu", "label": "Processador", "value": "Especificação" },
    { "icon": "monitor", "label": "Tela", "value": "Especificação" },
    { "icon": "memory", "label": "RAM", "value": "Especificação" },
    { "icon": "hard-drive", "label": "Armazenamento", "value": "Especificação" },
    { "icon": "gpu", "label": "GPU", "value": "Especificação" }
  ],
  "pros": [
    "Ponto positivo 1",
    "Ponto positivo 2",
    "Ponto positivo 3",
    "Ponto positivo 4"
  ],
  "cons": [
    "Ponto negativo 1",
    "Ponto negativo 2",
    "Ponto negativo 3"
  ],
  "ratings": {
    "overall": 4.5,
    "performance": 4.5,
    "display": 4.5,
    "build": 4.5,
    "battery": 4.0,
    "value": 4.0
  },
  "prices": {
    "amazon": { "price": 0, "originalPrice": 0, "url": "ADICIONAR_LINK_AFILIADO" },
    "kabum": { "price": 0, "url": "ADICIONAR_LINK_AFILIADO" },
    "pichau": { "price": 0, "url": "ADICIONAR_LINK_AFILIADO" }
  },
  "deal": {
    "active": false,
    "badge": "",
    "expiresAt": ""
  },
  "category": "windows"
}

Use ícones válidos: cpu, monitor, memory, hard-drive, gpu, battery, wifi, weight
Categorias válidas: windows, apple, gaming, smartphones, budget, ultrabooks
Os preços devem ser em Reais (BRL). Se não souber o preço exato, estime baseado no mercado brasileiro.
`;

    try {
        // Gerar meta.json
        console.log("📋 Gerando especificações...");
        const metaResult = await model.generateContent(metaPrompt);
        let metaText = metaResult.response.text().trim();

        // Limpar possíveis marcações de código
        metaText = metaText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

        const meta = JSON.parse(metaText);
        console.log("✅ Especificações geradas!\n");

        // Prompt para gerar o artigo MDX
        const articlePrompt = `
Você é um jornalista de tecnologia brasileiro escrevendo para o ContextGrid, um blog de reviews.
Escreva um review completo e detalhado sobre o "${productName}".

IMPORTANTE: Use Google Search para buscar informações atuais, benchmarks e opiniões sobre este produto.

Formato do artigo (retorne APENAS o conteúdo MDX, sem frontmatter):

Comece com um parágrafo de introdução cativante.

## Primeiras Impressões

Descreva o design, materiais, sensação ao usar.

## Performance e Benchmarks

Discuta performance, benchmarks reais se disponíveis, experiência de uso.

## Tela e Qualidade de Imagem

Se aplicável, fale sobre a tela, cores, brilho.

## Bateria

Duração da bateria em diferentes cenários de uso.

## Veredito Final

Conclusão com recomendação clara de para quem é indicado.

> **Nota do Editor:** [Adicione uma nota pessoal sobre sua experiência]

---

Requisitos:
- Escreva em português brasileiro
- Tom profissional mas acessível
- Use **negrito** para destacar informações importantes
- Seja honesto sobre prós e contras
- Artigo com aproximadamente 800-1000 palavras
`;

        console.log("✍️  Gerando artigo...");
        const articleResult = await model.generateContent(articlePrompt);
        const articleContent = articleResult.response.text().trim();
        console.log("✅ Artigo gerado!\n");

        // Criar diretório
        fs.mkdirSync(reviewDir, { recursive: true });

        // Salvar meta.json
        const metaPath = path.join(reviewDir, "meta.json");
        fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf-8");
        console.log(`📁 Criado: ${metaPath}`);

        // Criar frontmatter
        const today = new Date().toISOString().split("T")[0];
        const frontmatter = `---
title: "${meta.product.name}: Vale a Pena em ${new Date().getFullYear()}?"
excerpt: "Análise completa do ${meta.product.name} - especificações, benchmarks e veredito final"
category: ${meta.category || "windows"}
author: voce
publishedAt: "${today}"
rating: ${meta.ratings.overall}
badge: null
---

`;

        // Salvar index.mdx
        const mdxPath = path.join(reviewDir, "index.mdx");
        fs.writeFileSync(mdxPath, frontmatter + articleContent, "utf-8");
        console.log(`📁 Criado: ${mdxPath}`);

        console.log("\n" + "=".repeat(50));
        console.log("🎉 Review gerado com sucesso!");
        console.log("=".repeat(50));
        console.log("\n📝 Próximos passos:\n");
        console.log("1. Abra os arquivos e adicione seu toque pessoal:");
        console.log(`   - ${metaPath}`);
        console.log(`   - ${mdxPath}\n`);
        console.log("2. Adicione os links de afiliado reais em meta.json");
        console.log("3. Ajuste os preços para valores atuais");
        console.log("4. Revise o texto e adicione suas opiniões\n");

    } catch (error) {
        console.error("❌ Erro ao gerar review:", error);
        if (error instanceof SyntaxError) {
            console.log("\nDica: A IA pode ter retornado JSON inválido. Tente novamente.");
        }
    }

    rl.close();
}

// Main
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("Uso: npm run new-review \"Nome do Produto\"");
    console.log("Exemplo: npm run new-review \"MacBook Pro M3 Max 16 polegadas\"");
    process.exit(1);
}

const productName = args.join(" ");
generateReview(productName);
