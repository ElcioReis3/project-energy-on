"use client";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useListClientesStore } from "@/stores/useListClientesStore";
import { formatDate } from "@/services/formatDate";
import { Trash } from "lucide-react";
import api from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { DialogConfirm } from "../Dialogs/DialogConfirm";

export const TableClientes = () => {
  const { toast } = useToast();
  const clientes = useListClientesStore((state) => state.clientes);
  const fetchClientes = useListClientesStore((state) => state.fetchClientes);

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await api.delete(`/delete-client/${id}`);

    if (response.status === 200) {
      toast({ title: "Deletado com sucesso" });
    } else {
      toast({ title: "Error ao deletar!" });
    }
  };

  return (
    <Table className="w-full overflow-x-auto">
      <TableCaption>Lista completa de clientes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-96">Nome</TableHead>
          <TableHead className="w-52">Endereço</TableHead>
          <TableHead className="w-32">Telefone</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>CPF</TableHead>
          <TableHead>Data de Nascimento</TableHead>
          <TableHead>Última leitura</TableHead>
          <TableHead>Medidor</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clientes.map((cliente) => (
          <TableRow key={cliente.id}>
            <TableCell className="w-96 whitespace-nowrap p-2">
              {cliente.name}
            </TableCell>
            <TableCell className="w-52 whitespace-nowrap p-2">
              {cliente.address}
            </TableCell>
            <TableCell className="w-32 whitespace-nowrap p-2">
              {cliente.contact}
            </TableCell>
            <TableCell className="max-w-40 truncate">{cliente.email}</TableCell>
            <TableCell>{cliente.privy}</TableCell>
            <TableCell>{formatDate(cliente.birth)}</TableCell>
            <TableCell>{cliente.count_meter}</TableCell>
            <TableCell>{cliente.meter}</TableCell>
            <TableCell className="text-right">
              <DialogConfirm handleDelete={() => handleDelete(cliente.id)}>
                <Trash className="cursor-pointer" />
              </DialogConfirm>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
