import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import LayoutClient from "./layoutClient";

export const metadata: Metadata = {
  title: "Empresa X",
  description:
    "Com anos de experiência no mercado automotivo, nossa missão é conectar você ao carro dos seus sonhos com transparência, segurança e condições imperdíveis.",
  openGraph: {
    title: "Nome da sua Empresa",
    description:
      "Com anos de experiência no mercado automotivo, nossa missão é conectar você ao carro dos seus sonhos com transparência, segurança e condições imperdíveis.",
    url: "https://marketplace-cars.netlify.app/",
    type: "website",
    images: [
      {
        url: "https://marketplace-cars.netlify.app/_next/image?url=%2Fassets%2Fimages%2Fcar.png&w=640&q=75",
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
