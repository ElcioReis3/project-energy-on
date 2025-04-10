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
      <Link href={"/"}>
        <Image
          className="w-max m-auto p-3"
          src="/assets/images/logomarca.png"
          width={70}
          height={70}
          alt="logomarca"
        />
      </Link>
      <Separator />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
