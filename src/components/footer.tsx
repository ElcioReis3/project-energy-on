import Link from "next/link";
import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="w-full bg-muted-foreground">
      <Separator />
      <div className="w-full max-w-3xl m-auto grid grid-cols-1 items-center justify-center px-3 py-7 gap-3 md:grid-cols-2">
        <div className="text-center sm:text-left">
          <div className="font-semibold">Endereço</div>
          <div className="text-xs">Seu endereço completo aqui</div>
        </div>
        <div className="text-center sm:text-left">
          <div className="font-semibold">Redes Sociais</div>
          <div className="flex gap-3 items-center justify-center sm:justify-normal">
            <div className="text-xs">WhatsApp</div>
            {"|"}
            <div className="text-xs">Instagram</div>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <div className="font-semibold">Funcionamento</div>
          <div className="text-xs">
            Seg à Sex: 08:00 às 12:00 | 14:00 às 18:00
          </div>
          <div className="text-xs">Sábado: 09:00 às 18:00</div>
        </div>
        <div className="text-center sm:text-left">
          {" "}
          <div className="font-semibold">Saiba mais</div>
          <Link href={"/about"} className="underline text-sm">
            Sobre nossa empresa
          </Link>
        </div>
      </div>
      <Separator />
      <div className="w-full text-center py-7">
        Criado por{" "}
        <Link
          prefetch={true}
          className="font-semibold"
          href="https://portifolio-elcio-reis.netlify.app/"
          target="_blank"
        >
          ElcioServiçosOn
        </Link>
      </div>
    </footer>
  );
};
