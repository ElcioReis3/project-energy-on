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
import { formatDateTimeBR } from "@/services/formatDate";
import { Trash } from "lucide-react";
import api from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { title } from "process";

export const TableClientes = () => {
  const { toast } = useToast();
  const { clientes, fetchClientes } = useListClientesStore();

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
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[900px]">
        {" "}
        <TableCaption>Lista completa de clientes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Nome</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead className="w-40">E-mail</TableHead>
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
              <TableCell className="font-medium">{cliente.name}</TableCell>
              <TableCell className="max-w-40 truncate">
                {cliente.address}
              </TableCell>
              <TableCell>{cliente.contact}</TableCell>
              <TableCell className="max-w-40 truncate">
                {cliente.email}
              </TableCell>
              <TableCell>{cliente.privy}</TableCell>
              <TableCell>{formatDateTimeBR(cliente.birth)}</TableCell>
              <TableCell>{cliente.count_meter}</TableCell>
              <TableCell>{cliente.meter}</TableCell>
              <TableCell className="text-right">
                <Trash
                  className="cursor-pointer"
                  onClick={() => handleDelete(cliente.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
