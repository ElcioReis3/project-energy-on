import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="w-full">
      <div className="w-full max-w-3xl p-3 flex justify-center m-auto relative">
        <Link href={"/"}>
          <Image
            src="/assets/images/logomarca.png"
            width={130}
            height={130}
            alt="logomarca"
          />
        </Link>
        <Button className="absolute bottom-3 right-3">Consultar</Button>
      </div>
      <Separator />
    </header>
  );
};
