import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTime } from "@/services/formatDate";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "../ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { CobranceType } from "@/types/cobranceType";

type Props = {
  data: CobranceType;
};

export const QrCodeModal = ({ data }: Props) => {
  const qrValue = `
🔐 Cobrança de Energia

👤 Nome: ${data.name}
🔢 Medidor: ${data.meter}
⚡ Consumo: ${data.count_meter} kWh
💰 Valor: R$ ${data.price.toFixed(2)}
📅 Gerado em: ${formatDateTime(data.currentDate)}
📆 Vencimento: ${formatDateTime(data.maturityDate)}
📌 Status: ${data.status}
`;

  const boletoRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = async () => {
    const input = boletoRef.current;
    if (input) {
      const canvas = await html2canvas(input, {
        scale: 2,
        backgroundColor: "#fff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const desiredWidth = pageWidth * 0.7;
      const desiredHeight = (canvas.height * desiredWidth) / canvas.width;

      const marginX = (pageWidth - desiredWidth) / 2;
      const marginY = (pageHeight - desiredHeight) / 2;

      pdf.addImage(
        imgData,
        "PNG",
        marginX,
        marginY,
        desiredWidth,
        desiredHeight
      );

      pdf.save(`boleto_${data.name}.pdf`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 underline">Ver QR Code</button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center max-w-xl">
        <DialogTitle className="sr-only">QR Code da Cobrança</DialogTitle>
        <div
          ref={boletoRef}
          className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-4 w-full max-w-xl border border-gray-300 mx-5"
          style={{
            width: "400px",
          }}
        >
          <h2 className="text-2xl font-bold text-center">
            Boleto de Cobrança de Energia
          </h2>

          <div className="w-full grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <strong>Nome:</strong> {data.name}
              </p>
              <p>
                <strong>Medidor:</strong> {data.meter}
              </p>
            </div>
            <div>
              <p>
                <strong>Consumo:</strong> {data.count_meter} kWh
              </p>
              <p>
                <strong>Validade:</strong>
                {formatDateTime(data.maturityDate)}
              </p>
              <p className="p-2 rounded-md border">
                <strong>Valor:</strong> R$ {data.price.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="w-full border-t border-gray-300 my-4"></div>

          <div className="w-full text-center">
            <p
              className={`text-center font-semibold mb-2 ${
                data.status === "ABERTO"
                  ? "text-green-500"
                  : data.status === "VENCIDO"
                  ? "text-red-500"
                  : "text-gray-700"
              }`}
            >
              <strong>Status:</strong> {data.status}
            </p>
            <div className="w-max m-auto">
              <QRCodeCanvas value={qrValue} size={180} />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Apresente este QR Code para pagamento ou utilize os dados acima.
            </p>
          </div>

          <div className="w-full border-t border-gray-300 mt-4 pt-2 text-xs text-center text-gray-500">
            Documento gerado pelo Sistema de Cobrança de Energia.
          </div>
        </div>

        <Button onClick={handleGeneratePDF}>Imprimir Boleto</Button>
      </DialogContent>
    </Dialog>
  );
};
