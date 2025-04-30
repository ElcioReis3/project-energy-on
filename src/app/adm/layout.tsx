import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export const metadata: Metadata = {
  title: "Energy On",
  description: "Empresa de gerenciamento de energia.",
};

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full">
      <Header visibility={true} />
      <Separator />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
