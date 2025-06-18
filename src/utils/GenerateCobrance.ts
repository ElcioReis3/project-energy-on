import { Toast } from "@/components/ui/toast";

export const generateCobrance = (valorKwh: string, count_meter: number[]) => {
  const leituraAtual = parseInt(valorKwh);
  const leituraAnterior = count_meter[count_meter.length - 1] ?? 0;
  const valorUnitario = 0.75;

  if (isNaN(leituraAtual) || leituraAtual < leituraAnterior) {
    Toast({ title: "Verifique a leitura atual inserida." });
    return;
  }

  const consumo = leituraAtual - leituraAnterior;
  const valorTotal = consumo * valorUnitario;
  return valorTotal;
};
