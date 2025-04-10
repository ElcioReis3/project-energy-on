import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import LayoutClient from "./layoutClient";

export const metadata: Metadata = {
  title: "Energy on",
  description: "A melhor empresa de energia de Caxias.",
  openGraph: {
    title: "Energy On - Criada por ElcioServiçosOn",
    description: "Conheça nosso sistema.",
    url: "https://energy-on-elcioservicos.netlify.app/",
    type: "website",
    images: [
      {
        url: "https://energy-on-elcioservicos.netlify.app/_next/image?url=%2Fassets%2Fimages%2Flogomarca.png&w=96&q=75",
        width: 256,
        height: 256,
        alt: "Logomarca",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <LayoutClient>{children}</LayoutClient>
        <Toaster />
      </body>
    </html>
  );
}
