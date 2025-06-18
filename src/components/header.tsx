"use client";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ConsultDialog } from "./Dialogs/ConsultDialog";
import { House } from "lucide-react";
import { useRouter } from "next/navigation";
import { LogoMarca } from "./Logo";

type Props = {
  visibility: boolean;
};

export const Header = ({ visibility }: Props) => {
  const router = useRouter();
  return (
    <header className="w-full">
      <div className="w-full max-w-3xl p-3 flex justify-center m-auto relative">
        {visibility && (
          <House
            className="absolute bottom-3 left-3 cursor-pointer"
            onClick={() => router.push("/adm/checking")}
          />
        )}
        <LogoMarca />
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
