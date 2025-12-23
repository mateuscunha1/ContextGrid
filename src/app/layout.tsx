import type { Metadata } from "next";
import { Work_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { JsonLd, generateWebSiteSchema, generateOrganizationSchema } from "@/components/seo/JsonLd";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://contextgrid.vercel.app'),
  title: {
    default: "ContextGrid - Melhores Ofertas em Tecnologia 2025",
    template: "%s | ContextGrid",
  },
  description:
    "Encontre os melhores preços em smartphones, notebooks e gadgets. Reviews detalhados + comparativo de lojas + links diretos para compra. Economize até 40%!",
  keywords: [
    "review tecnologia",
    "melhor preço celular",
    "comparativo notebooks",
    "ofertas tech",
    "smartphone barato",
    "PC gamer promoção",
  ],
  authors: [{ name: "ContextGrid" }],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "ContextGrid",
    title: "ContextGrid - Melhores Ofertas em Tecnologia",
    description:
      "🔥 Reviews + Comparativo de Preços + Links Diretos. Economize até 40% nas suas compras de tecnologia.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ContextGrid" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextGrid - Melhores Ofertas em Tecnologia",
    description: "🔥 Reviews + Comparativo de Preços. Economize até 40%!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <JsonLd data={generateWebSiteSchema()} />
        <JsonLd data={generateOrganizationSchema()} />
      </head>
      <body
        className={`${workSans.variable} ${merriweather.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
          <CookieConsent />
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
