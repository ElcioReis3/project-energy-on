import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TableConsult = () => {
  return (
    <Table>
      <TableCaption>Lista de cobranças</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Referente</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Mês</TableCell>
          <TableCell>R$ 150,00</TableCell>
          <TableCell className="text-right">Vencimento / Pago</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
