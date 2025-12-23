import Link from "next/link";
import { ChevronRight, Users, Target, Award, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const team = [
    {
        name: "João Silva",
        role: "Editor Chefe de Hardware",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        bio: "15+ anos cobrindo tecnologia. Ex-editor da TechTudo e PCWorld Brasil.",
    },
    {
        name: "Maria Costa",
        role: "Especialista Apple",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        bio: "Usuária Apple desde o iPhone 3G. Certificada Apple Device Support Professional.",
    },
    {
        name: "Pedro Santos",
        role: "Editor de Gaming",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        bio: "Gamer desde os 6 anos. Especialista em hardware de alta performance.",
    },
];

const values = [
    {
        icon: Target,
        title: "Imparcialidade",
        description: "Nossas análises são baseadas em testes reais, não em acordos comerciais.",
    },
    {
        icon: Users,
        title: "Comunidade",
        description: "Ouvimos nossos leitores e criamos conteúdo baseado em suas necessidades.",
    },
    {
        icon: Award,
        title: "Excelência",
        description: "Cada review passa por múltiplas rodadas de revisão antes de ser publicado.",
    },
];

export default function SobrePage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium uppercase tracking-wider">
                <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                </Link>
                <ChevronRight className="size-3" />
                <span className="text-foreground">Sobre</span>
            </div>

            {/* Hero */}
            <header className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-black mb-6">
                    Sobre o{" "}
                    <span className="bg-primary text-primary-foreground px-3 py-1 inline-block">
                        ContextGrid
                    </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Somos um portal brasileiro de tecnologia focado em reviews honestos,
                    comparativos detalhados e as melhores ofertas do mercado.
                </p>
            </header>

            {/* Mission */}
            <section className="mb-16">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-black mb-6">Nossa Missão</h2>
                        <p className="text-muted-foreground mb-4">
                            Acreditamos que comprar tecnologia não deveria ser complicado.
                            Por isso, criamos o ContextGrid: um lugar onde você encontra
                            análises imparciais, comparações lado a lado e sempre o melhor
                            preço disponível em múltiplas lojas.
                        </p>
                        <p className="text-muted-foreground mb-4">
                            Diferente de outros sites, pesquisamos extensivamente os produtos que
                            analisamos. Passamos horas comparando especificações, benchmarks e
                            avaliações de usuários reais antes de dar nosso veredito final.
                        </p>
                        <p className="text-muted-foreground">
                            Nosso modelo de negócio é simples: ganhamos comissões quando você
                            compra através dos nossos links de afiliados. Isso não influencia
                            nossas análises - recomendamos apenas produtos que recomendaríamos
                            para amigos e família.
                        </p>
                    </div>
                    <div className="bg-muted rounded-2xl p-8 text-center">
                        <div className="text-6xl font-black text-primary mb-4">100%</div>
                        <p className="text-muted-foreground">
                            Transparência sobre nossa metodologia e modelo de negócio
                        </p>
                    </div>
                </div>
            </section>

            {/* Methodology */}
            <section className="mb-16 bg-card border border-border rounded-2xl p-8">
                <h2 className="text-3xl font-black mb-6">Nossa Metodologia</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-3">📊 Como Avaliamos</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>• Pesquisa aprofundada de especificações técnicas</li>
                            <li>• Análise de benchmarks de fontes confiáveis</li>
                            <li>• Compilação de reviews de usuários reais</li>
                            <li>• Comparação de preços em múltiplas lojas</li>
                            <li>• Avaliação de custo-benefício</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">🎯 Critérios de Rating</h3>
                        <ul className="space-y-2 text-muted-foreground">
                            <li>• <strong>5/5:</strong> Excepcional, melhor da categoria</li>
                            <li>• <strong>4/5:</strong> Excelente, altamente recomendado</li>
                            <li>• <strong>3/5:</strong> Bom, atende às expectativas</li>
                            <li>• <strong>2/5:</strong> Regular, tem limitações significativas</li>
                            <li>• <strong>1/5:</strong> Não recomendado</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="mb-16">
                <h2 className="text-3xl font-black text-center mb-10">Nossos Valores</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="bento-card p-6 text-center"
                        >
                            <div className="size-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <value.icon className="size-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                            <p className="text-muted-foreground text-sm">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="mb-16">
                <h2 className="text-3xl font-black text-center mb-10">Nossa Equipe</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member) => (
                        <div key={member.name} className="bento-card p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="size-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-bold">{member.name}</h3>
                                    <p className="text-sm text-primary">{member.role}</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="bg-foreground rounded-2xl p-8 md:p-12 text-background text-center">
                <Mail className="size-12 mx-auto mb-4 opacity-80" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Quer entrar em contato?
                </h2>
                <p className="text-background/70 mb-6 max-w-lg mx-auto">
                    Sugestões de produtos para review, parcerias ou só quer mandar um oi.
                    Estamos sempre abertos para conversar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Input
                        placeholder="Seu email"
                        className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                    />
                    <Button className="btn-cta-gold">
                        Enviar Mensagem
                        <ArrowRight className="size-4 ml-2" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
