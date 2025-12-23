import { Scale, Shield, FileText } from "lucide-react";

export const metadata = {
    title: "Informações Legais",
    description: "Disclaimer de afiliados, política de privacidade e termos de uso do ContextGrid.",
};

export default function LegalPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-black mb-4">
                        Informações Legais
                    </h1>
                    <p className="text-muted-foreground">
                        Transparência sobre como operamos e protegemos seus dados.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12">
                    {/* Disclaimer de Afiliados */}
                    <section className="bg-card border border-border rounded-xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gold/10 rounded-lg">
                                <Scale className="size-5 text-gold" />
                            </div>
                            <h2 className="text-xl font-bold">Disclaimer de Afiliados</h2>
                        </div>

                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p>
                                O ContextGrid participa de <strong>programas de afiliados</strong>,
                                incluindo o Programa de Associados da Amazon Brasil e outros parceiros.
                                Isso significa que podemos receber comissões por compras realizadas
                                através dos links em nosso site.
                            </p>

                            <p>
                                <strong>Importante:</strong> Isso não representa nenhum custo adicional
                                para você. Os preços que você paga são exatamente os mesmos, com ou
                                sem o uso de nossos links.
                            </p>

                            <h3>Nossa Independência Editorial</h3>
                            <p>
                                A participação em programas de afiliados <strong>não influencia</strong> nossas
                                avaliações. Todos os reviews são baseados em:
                            </p>
                            <ul>
                                <li>Pesquisas independentes</li>
                                <li>Análises técnicas detalhadas</li>
                                <li>Comparativos de mercado</li>
                                <li>Feedback de usuários reais</li>
                            </ul>

                            <p>
                                Nosso compromisso é fornecer informações honestas e úteis para
                                ajudá-lo a tomar a melhor decisão de compra.
                            </p>
                        </div>
                    </section>

                    {/* Política de Privacidade */}
                    <section className="bg-card border border-border rounded-xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Shield className="size-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-bold">Política de Privacidade</h2>
                        </div>

                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p>
                                Sua privacidade é importante para nós. Esta política explica como
                                coletamos e usamos informações em nosso site.
                            </p>

                            <h3>Dados que Coletamos</h3>
                            <ul>
                                <li>
                                    <strong>Dados de navegação anônimos:</strong> Páginas visitadas,
                                    tempo de permanência, tipo de dispositivo (sem identificação pessoal).
                                </li>
                                <li>
                                    <strong>Cookies:</strong> Usamos cookies para análise de tráfego
                                    e funcionamento do site.
                                </li>
                            </ul>

                            <h3>Como Usamos</h3>
                            <ul>
                                <li>Melhorar a experiência de navegação</li>
                                <li>Entender quais conteúdos são mais úteis</li>
                                <li>Otimizar o desempenho do site</li>
                            </ul>

                            <h3>O Que NÃO Fazemos</h3>
                            <ul>
                                <li>Não vendemos seus dados</li>
                                <li>Não compartilhamos informações pessoais com terceiros</li>
                                <li>Não coletamos dados sensíveis</li>
                            </ul>

                            <h3>Seus Direitos (LGPD)</h3>
                            <p>
                                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem
                                direito a solicitar acesso, correção ou exclusão de seus dados.
                                Para isso, entre em contato conosco.
                            </p>
                        </div>
                    </section>

                    {/* Termos de Uso */}
                    <section className="bg-card border border-border rounded-xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-muted rounded-lg">
                                <FileText className="size-5 text-muted-foreground" />
                            </div>
                            <h2 className="text-xl font-bold">Termos de Uso</h2>
                        </div>

                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p>
                                Ao usar o ContextGrid, você concorda com os seguintes termos:
                            </p>

                            <h3>Uso do Conteúdo</h3>
                            <ul>
                                <li>O conteúdo é fornecido para fins informativos</li>
                                <li>Os preços podem variar sem aviso prévio</li>
                                <li>Recomendamos verificar as informações nas lojas oficiais</li>
                            </ul>

                            <h3>Limitação de Responsabilidade</h3>
                            <p>
                                O ContextGrid não se responsabiliza por:
                            </p>
                            <ul>
                                <li>Variações de preço após a publicação</li>
                                <li>Disponibilidade de produtos nas lojas</li>
                                <li>Problemas com compras realizadas em sites de terceiros</li>
                            </ul>

                            <h3>Propriedade Intelectual</h3>
                            <p>
                                Todo o conteúdo original do site (textos, design, logos) é
                                propriedade do ContextGrid. Imagens de produtos pertencem
                                aos seus respectivos fabricantes.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Last Updated */}
                <div className="text-center mt-12 text-sm text-muted-foreground">
                    <p>Última atualização: Dezembro de 2024</p>
                    <p className="mt-2">
                        Dúvidas? Entre em contato através do email: contato@contextgrid.com.br
                    </p>
                </div>
            </div>
        </div>
    );
}
