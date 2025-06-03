import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTimeBR } from "@/services/formatDate";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "../ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

export const QrCodeModal = ({ data }: { data: any }) => {
  const qrValue = `
🔐 Cobrança de Energia

👤 Nome: ${data.name}
🔢 Medidor: ${data.meter}
⚡ Consumo: ${data.count_meter} kWh
💰 Valor: R$ ${data.price.toFixed(2)}
📅 Gerado em: ${formatDateTimeBR(data.currentDate)}
📆 Vencimento: ${formatDateTimeBR(data.maturityDate)}
📌 Status: ${data.status}
`;

  const boletoRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = async () => {
    const input = boletoRef.current;
    if (input) {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`boleto_${data.name}.pdf`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 underline">Ver QR Code</button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center">
        <DialogTitle className="sr-only">QR Code da Cobrança</DialogTitle>

        {/* Área que será capturada no PDF */}
        <div
          ref={boletoRef}
          className="bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-4 w-full max-w-[600px] border border-gray-300"
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
                <strong>Valor:</strong> R$ {data.price.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="w-full border-t border-gray-300 my-4"></div>

          <div className="w-full text-center">
            <p className="mb-2">
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
