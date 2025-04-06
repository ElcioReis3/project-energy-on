"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import api from "@/services/api";

export const ReadingDialog = ({ children }: { children: React.ReactNode }) => {
  const [prevCount, setPrevCount] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [numberMeter, setNumberMeter] = useState<string>("");
  const [dataAtual, setDataAtual] = useState("");
  const [vencimento, setVencimento] = useState("");

  const handleClient = async (series: string) => {
    console.log(series);
    try {
      const response = await api.get(`/get-client?serie=${series}`);
    } catch (error) {
      alert("Número de série do medidor não encontrado");
    }
  };

  useEffect(() => {
    const hoje = new Date();
    const dataVencimento = new Date();

    dataVencimento.setDate(hoje.getDate() + 7);
    const vencimentoFormatado = dataVencimento.toISOString().split("T")[0];
    const dataFormatada = hoje.toISOString().split("T")[0];

    setVencimento(vencimentoFormatado);
    setDataAtual(dataFormatada);
  }, []);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leitura do medidor</DialogTitle>
          <DialogDescription>
            {" "}
            Leia através da câmera ou digite os dados manualmente.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Button>Abrir câmera</Button>
        </div>
        <div>
          <div>Leitura manual</div>
          <div className="flex flex-col gap-2">
            <Input type="number" placeholder="leitura Kwh" />
            <Input
              type="date"
              placeholder="data"
              value={dataAtual}
              onChange={(e) => setDataAtual(e.target.value)}
            />
            <Input
              type="text"
              placeholder="número série do medidor"
              value={numberMeter}
              onChange={(e) => setNumberMeter(e.target.value)}
            />
            {userName && (
              <>
                <Input type="text" placeholder="Cliente" value={userName} />
                <div>Leitura anterior: {prevCount}</div>
                <Button>Gerar dados de cobrança</Button>
              </>
            )}
            {numberMeter.length > 2 && (
              <Button onClick={() => handleClient(numberMeter)}>Buscar</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
