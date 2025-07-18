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
import { QrCodeModal } from "../Hover/QrCodeModal";
import { getConsultMeter } from "@/app/api/apisGet";
import { formatDateTime } from "@/services/formatDate";

export const TableAdm = () => {
  const cobrances = useCobranceStore((state) => state.cobrances);
  const setCobrances = useCobranceStore((state) => state.setCobrances);

  useEffect(() => {
    const fetchCobrancas = async () => {
      const cobrancesData = await getConsultMeter();
      setCobrances(cobrancesData);
    };

    fetchCobrancas();
  }, [setCobrances]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-orange-200 hover:bg-orange-300">
            <TableHead className="max-w-20">Data</TableHead>
            <TableHead className="w-28 whitespace-nowrap">
              Número do medidor
            </TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {cobrances.map((cobranca) => (
            <TableRow
              key={cobranca.id}
              className="bg-orange-50 hover:bg-orange-100"
            >
              <TableCell className="max-w-20">
                {formatDateTime(cobranca.currentDate)}
              </TableCell>
              <TableCell>{cobranca.meter}</TableCell>
              <TableCell className="w-32 whitespace-nowrap">
                {cobranca.name}
              </TableCell>
              <TableCell className="w-28 whitespace-nowrap">
                <QrCodeModal data={cobranca} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
