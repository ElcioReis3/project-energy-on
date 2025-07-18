import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { CobranceType } from "@/types/cobranceType";
import { LayoutPayment } from "../LayoutPayment";

type Props = {
  data: CobranceType;
};

export const QrCodeModal = ({ data }: Props) => {
  const boletoRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = async () => {
    const input = boletoRef.current;
    if (input) {
      const canvas = await html2canvas(input, {
        scale: 2, // melhora a qualidade
        backgroundColor: "#fff",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidthPx = imgProps.width;
      const imgHeightPx = imgProps.height;

      // Convertemos pixels para mm (resolução padrão do jsPDF é 96 DPI)
      const pxToMm = (px: number) => (px * 25.4) / 96;

      const imgWidthMm = pxToMm(imgWidthPx);
      const imgHeightMm = pxToMm(imgHeightPx);

      // Calcula a escala necessária para caber a imagem em UMA página
      const widthScale = pageWidth / imgWidthMm;
      const heightScale = pageHeight / imgHeightMm;
      const scale = Math.min(widthScale, heightScale); // usa o menor para caber nos dois

      const finalWidth = imgWidthMm * scale;
      const finalHeight = imgHeightMm * scale;

      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
      pdf.save(`boleto_${data.name}.pdf`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 underline">Ver comprovante</button>
      </DialogTrigger>
      <DialogContent className="w-full h-full flex flex-col items-center overflow-scroll xs:max-w-full md:max-w-4xl">
        <DialogTitle className="sr-only">Comprovante de Cobrança</DialogTitle>

        <LayoutPayment data={data} refDiv={boletoRef} />
        <Button onClick={handleGeneratePDF}>Imprimir Boleto</Button>
      </DialogContent>
    </Dialog>
  );
};
