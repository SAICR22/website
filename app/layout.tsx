import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://itamifood.com.br"),
  title: {
    default: "Itami Food Consulting | Consultoria para a indústria de alimentos",
    template: "%s | Itami Food Consulting",
  },
  description: "Consultoria B2B em qualidade, segurança dos alimentos, pesquisa e desenvolvimento, rotulagem e documentação técnica.",
  keywords: ["consultoria alimentos", "qualidade de alimentos", "P&D alimentos", "rotulagem", "segurança dos alimentos"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Itami Food Consulting",
    title: "Itami Food Consulting",
    description: "Qualidade, desenvolvimento e inovação para a indústria de alimentos.",
  },
  twitter: {
    card: "summary",
    title: "Itami Food Consulting",
    description: "Qualidade, desenvolvimento e inovação para a indústria de alimentos.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0d0e",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Itami Food Consulting",
  url: "https://itamifood.com.br",
  email: "contato@itamifood.com.br",
  description: "Consultoria técnica para a indústria de alimentos.",
  areaServed: "BR",
  knowsAbout: ["Qualidade e segurança dos alimentos", "Pesquisa e desenvolvimento", "Rotulagem", "Documentação técnica"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
