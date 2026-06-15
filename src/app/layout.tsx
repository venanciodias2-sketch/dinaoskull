import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { LeadProvider } from "@/context/LeadContext";
import { ContentProvider } from "@/context/ContentContext";
import LeadPopup from "@/components/LeadPopup";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dinaoskull.com"),
  title: "Dinão Skull Thermo - Termogênico Ultra Concentrado",
  description: "Conheça o Dinão Skull Thermo: suplemento termogênico ultra concentrado em cápsulas para apoiar energia, foco e rotina de treino.",
  keywords: ["termogênico", "suplemento", "energia", "foco", "treino", "Dinão Skull"],
  openGraph: {
    title: "Dinão Skull Thermo - Termogênico Ultra Concentrado",
    description: "Suplemento ultra concentrado para energia, foco e rotina de treino.",
    type: "website",
    locale: "pt_BR",
    url: "https://dinaoskull.com",
    images: [
      {
        url: "/pote_preto.jpg",
        width: 1200,
        height: 630,
        alt: "Dinão Skull Thermo",
      },
    ],
  },
};

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
