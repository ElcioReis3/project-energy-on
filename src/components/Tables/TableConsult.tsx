// components/TableConsult.tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/services/api";
import { useCobranceStore } from "@/stores/useCobranceStore";
import { useConsultStore } from "@/stores/useConsultStore";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { CobranceType } from "@/types/cobranceType";
import { useToast } from "@/hooks/use-toast";
import usePaymentCobranceStore from "@/stores/usePaymentCobrance";

export const TableConsult = () => {
  const cobrances = useCobranceStore((state) => state.cobrances);
  const setCobrances = useCobranceStore((state) => state.setCobrances);
  const setPaymentCobrance = usePaymentCobranceStore(
    (state) => state.setPaymentCobrance
  );
  const clientConsult = useConsultStore((state) => state.clientConsult);
  const { toast } = useToast();

  const handlePayment = async (cobranca: CobranceType) => {
    if (cobranca) {
      setPaymentCobrance(cobranca);
    }
    try {
      const response = await api.post("/payment", {
        title: cobranca.name ?? "Cobrança",
        quantity: 1,
        price: cobranca.price,
        description: "Pagamento de energia",
        cobrancaId: cobranca.id,
      });
      const { url } = response.data;
      window.open(url, "_blank");
    } catch (error) {
      toast({ title: "Erro ao iniciar pagamento." });
    }
  };

  const fetchCobrancas = async () => {
    if (!clientConsult || !clientConsult.meter) return;
    const response = await api.get("/consult-meter", {
      params: { meter: clientConsult.meter },
    });
    setCobrances(response.data.cobrances);
  };
  useEffect(() => {
    fetchCobrancas();
  }, [clientConsult, setCobrances]);

  return (
    <Table>
      <TableCaption>Lista de cobranças</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70px]">Ações</TableHead>
          <TableHead className="w-[100px]">Referente</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cobrances.map((cobranca: CobranceType) => (
          <TableRow key={cobranca.id}>
            <TableCell>
              {cobranca.status === "ABERTO" && (
                <Button onClick={() => handlePayment(cobranca)}>Pagar</Button>
              )}

              {cobranca.status === "VENCIDO" && (
                <Button
                  variant="destructive"
                  onClick={() => handlePayment(cobranca)}
                >
                  Pagar com multa
                </Button>
              )}
            </TableCell>
            <TableCell className="font-medium">
              {new Date(cobranca.maturityDate).toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              })}
            </TableCell>
            <TableCell>R$ {Number(cobranca.price).toFixed(2)}</TableCell>
            <TableCell>
              {new Date(cobranca.maturityDate).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell
              className={`text-right font-semibold ${
                cobranca.status === "ABERTO"
                  ? "text-green-500"
                  : cobranca.status === "VENCIDO"
                  ? "text-red-500"
                  : "text-gray-700"
              }`}
            >
              {cobranca.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
