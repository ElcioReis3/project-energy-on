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
import { useClientStore } from "@/stores/useClientStore";
import { useCobranceStore } from "@/stores/useCobranceStore";
import { useConsultStore } from "@/stores/useConsultStore";
import { useEffect } from "react";
import { Button } from "../ui/button";

export const TableConsult = () => {
  const { cobrances, setCobrances } = useCobranceStore();
  const { clientConsult } = useConsultStore();

  useEffect(() => {
    const fetchCobrancas = async () => {
      if (!clientConsult || !clientConsult.meter) return;
      const response = await api.get("/consult-meter", {
        params: { meter: clientConsult.meter },
      });
      setCobrances(response.data.cobrances);
    };

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
        {cobrances.map((cobranca) => (
          <TableRow key={cobranca.id}>
            <TableCell>
              <Button>Pagar</Button>
            </TableCell>
            <TableCell className="font-medium">
              {new Date(cobranca.currentDate).toLocaleDateString("pt-BR", {
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
                cobranca.status === "ABERTO" ? "text-green-500" : "text-black"
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
