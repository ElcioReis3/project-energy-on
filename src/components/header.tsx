"use client";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ConsultDialog } from "./Dialogs/ConsultDialog";
import { boolean } from "zod";

type Props = {
  visibility: boolean;
};

export const Header = ({ visibility }: Props) => {
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
        {visibility && (
          <ConsultDialog>
            <span className="absolute bottom-3 right-3">
              <Button>Consultar</Button>
            </span>
          </ConsultDialog>
        )}
      </div>
      <Separator />
    </header>
  );
};
