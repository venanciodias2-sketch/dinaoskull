import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Dinão Skull Thermo - Termogênico Ultra Concentrado | Queime Gordura Agora",
  description: "Transforme seu corpo com Dinão Skull Thermo. Termogênico ultra concentrado, 30 cápsulas 1000mg. Acelera metabolismo, queima gordura e dá energia explosiva.",
  keywords: ["termogênico", "emagrecedor", "queima gordura", "suplemento", "energia", "definição muscular"],
  openGraph: {
    title: "Dinão Skull Thermo - Termogênico Ultra Concentrado",
    description: "Queime gordura como nunca antes com a fórmula ultra concentrada de Dinão Skull Thermo.",
    type: "website",
    locale: "pt_BR",
    url: "https://dinaoskull.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dinão Skull Thermo",
      },
    ],
  },
};

import { LeadProvider } from "@/context/LeadContext";
import { ContentProvider } from "@/context/ContentContext";
import LeadPopup from "@/components/LeadPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${outfit.variable} ${plusJakarta.variable} font-body antialiased selection:bg-primary selection:text-white`}>
        <ContentProvider>
          <LeadProvider>
            {children}
            <LeadPopup />
          </LeadProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
