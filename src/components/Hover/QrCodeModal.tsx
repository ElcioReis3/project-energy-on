import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTimeBR } from "@/services/formatDate";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "../ui/button";

export const QrCodeModal = ({ data }: { data: any }) => {
  const qrValue = `
🔐 Cobrança de Energia\n

👤 Nome: ${data.name}\n
🔢 Medidor: ${data.meter}\n
⚡ Consumo: ${data.count_meter} kWh\n
💰 Valor: R$ ${data.price.toFixed(2)}\n
📅 Gerado em: ${formatDateTimeBR(data.currentDate)}\n
📆 Vencimento: ${formatDateTimeBR(data.maturityDate)}\n
📌 Status: ${data.status}\n
`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 underline">Ver QR Code</button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center">
        <DialogTitle className="sr-only">QR Code da Cobrança</DialogTitle>
        <QRCodeCanvas value={qrValue} size={256} />
        <Button>Imprimir Boleto</Button>
      </DialogContent>
    </Dialog>
  );
};
