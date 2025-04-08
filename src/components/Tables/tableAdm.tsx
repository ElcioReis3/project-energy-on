import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userType } from "@/types/userType";
import EditModal from "../formModal";

export const TableAdm = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Partial<userType>>({});

  const handleEditClick = (user: userType) => {
    setSelectedCar(user);
    setEditModalOpen(true);
  };

  const handleEdit = (id: string, updatedData: Partial<userType>) => {
    const formData = new FormData();
    formData.append("name", updatedData.name || "");
    formData.append("endereço", updatedData.address || "");
    formData.append("medidor", String(updatedData.meter || ""));
    formData.append("CPF ou CNPJ", updatedData.privy || "");
    formData.append("email", updatedData.email || "");
    formData.append("telefone", updatedData.contact || "");
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-24">Data</TableHead>
            <TableHead>Número do medidor</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="text-right">Dados</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full"></TableBody>
      </Table>

      {isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedCar({});
          }}
          initialData={selectedCar}
          onSave={(updatedData) => {
            if (selectedCar.id) {
              handleEdit(selectedCar.id, updatedData);
            }
            setEditModalOpen(false);
            setSelectedCar({});
          }}
        />
      )}
    </>
  );
};
