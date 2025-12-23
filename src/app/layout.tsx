import type { Metadata } from "next";
import { Work_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
  title: {
    default: "ContextGrid - Reviews de Tecnologia",
    template: "%s | ContextGrid",
  },
  description:
    "Portal brasileiro de reviews de tecnologia: laptops, smartphones, gaming e mais. Comparações detalhadas e os melhores preços do mercado.",
  keywords: [
    "reviews tecnologia",
    "comparação notebooks",
    "melhor celular",
    "PC gamer",
    "ofertas tech",
  ],
  authors: [{ name: "ContextGrid Team" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "ContextGrid",
    title: "ContextGrid - Reviews de Tecnologia",
    description:
      "Portal brasileiro de reviews de tecnologia: laptops, smartphones, gaming e mais.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextGrid - Reviews de Tecnologia",
    description: "Portal brasileiro de reviews de tecnologia.",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
