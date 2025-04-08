import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCobranceStore } from "@/stores/useCobranceStore";
import api from "@/services/api";
import { formatDateTimeBR } from "@/services/formatDate";
import { QrCodeModal } from "../Hover/QrCodeModal";

export const TableAdm = () => {
  const { cobrances, setCobrances } = useCobranceStore();

  useEffect(() => {
    const fetchCobrancas = async () => {
      const response = await api.get("/consult-meter");
      setCobrances(response.data.cobrances);
    };

    fetchCobrancas();
  }, [setCobrances]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-orange-200 hover:bg-orange-300">
            <TableHead className="max-w-24">Data</TableHead>
            <TableHead>Número do medidor</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>QR Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {cobrances.map((cobranca) => (
            <TableRow
              key={cobranca.id}
              className="bg-orange-50 hover:bg-orange-100"
            >
              <TableCell>{formatDateTimeBR(cobranca.currentDate)}</TableCell>

              <TableCell>{cobranca.meter}</TableCell>
              <TableCell>{cobranca.name}</TableCell>
              <TableCell>
                <QrCodeModal data={cobranca} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
