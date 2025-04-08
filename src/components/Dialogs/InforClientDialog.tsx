"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useClientStore } from "@/stores/useClientStore";
import { Button } from "../ui/button";
import { maskPrivy } from "@/services/maskPrivy";

type InforClientDialogProps = {
  onGerarCobranca?: () => void;
  kwh: string;
  venciment?: Date;
  total?: number | null;
  children: React.ReactNode;
};

export const InforClientDialog = ({
  children,
  venciment,
  total,
  kwh,
  onGerarCobranca,
}: InforClientDialogProps) => {
  const { client } = useClientStore((state) => state);

  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dados do cliente</DialogTitle>
          <DialogDescription>Dados para cobrança</DialogDescription>
        </DialogHeader>

        {client && (
          <div className="flex flex-col border rounded-md gap-1 p-3">
            <div>
              <div className="font-semibold text-sm">Nome:</div> {client.name}
            </div>
            <div>
              <div className="font-semibold text-sm">Endereço:</div>{" "}
              {client.address}
            </div>
            <div>
              <div className="font-semibold text-sm">CPF/CNPJ:</div>{" "}
              {maskPrivy(client.privy)}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="font-semibold text-sm">Número do medidor:</div>{" "}
              {client.meter}
            </div>
            <div className="flex gap-3 text-muted-foreground text-xs">
              <div>Leitura anterior: {client.count_meter}</div>
              <div>Leitura atual: {kwh}</div>
            </div>
            <Button onClick={onGerarCobranca}>Gerar e salvar cobrança</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
