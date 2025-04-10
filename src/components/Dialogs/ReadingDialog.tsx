"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useClientStore } from "@/stores/useClientStore";
import { userType } from "@/types/userType";
import { ManualReadingForm } from "../ManualReadingForm";
import { useToast } from "@/hooks/use-toast";
import { CameraReader } from "../CameraReader";

export const ReadingDialog = ({ children }: { children: React.ReactNode }) => {
  const [numberMeter, setNumberMeter] = useState("");
  const [dataAtual, setDataAtual] = useState("");
  const [valorKwh, setValorKwh] = useState("");
  const [total, setTotal] = useState<number | null>(null);
  const { client, setClient } = useClientStore((state) => state);
  const [maturityDate, setMaturityDate] = useState(new Date());
  const [ultimaCobranca, setUltimaCobranca] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleClient = async () => {
    try {
      const response = await api.get(`/get-client/?meter=${numberMeter}`);
      const clientData = response.data.client as userType;
      setClient(clientData);

      // Buscar a cobrança mais recente
      const cobrancaRes = await api.get("/consult-meter", {
        params: { meter: clientData.meter },
      });

      const cobrancas = cobrancaRes.data.cobrances;
      if (cobrancas.length > 0) {
        setUltimaCobranca(new Date(cobrancas[0].currentDate));
      } else {
        setUltimaCobranca(null);
      }
    } catch (error) {
      toast({ title: "Número de série do medidor não encontrado" });
    }
  };

  const gerarCobranca = () => {
    const leituraAtual = parseInt(valorKwh);
    const leituraAnterior = client?.count_meter ?? 0;
    const valorUnitario = 0.75;

    if (isNaN(leituraAtual) || leituraAtual < leituraAnterior) {
      toast({ title: "Verifique a leitura atual inserida." });
      return;
    }

    const consumo = leituraAtual - leituraAnterior;
    const valorTotal = consumo * valorUnitario;
    setTotal(valorTotal);
  };

  useEffect(() => {
    const hoje = new Date();
    const vencimento = new Date(hoje);
    vencimento.setDate(vencimento.getDate() + 7);

    setDataAtual(hoje.toISOString().split("T")[0]);
    setMaturityDate(vencimento);
  }, []);

  const handleCobrance = async () => {
    gerarCobranca();
    if (!client || !valorKwh || total === null) {
      toast({ title: "Preencha os dados corretamente." });
      return;
    }

    try {
      const data = {
        name: client.name,
        count_meter: parseInt(valorKwh),
        meter: client.meter,
        currentDate: new Date(dataAtual),
        maturityDate: maturityDate,
        price: Number(total?.toFixed(2)),
        status: "ABERTO",
      };
      console.log("Data", data);

      const response = await api.post("/create-cobrance", data);
      console.log("Resposta", response.data.cobrances);
      toast({ title: "Cobrança criada com sucesso!" });
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        toast({
          title: "Erro ao criar cobrança.",
          description: `${err.response.data.message}`,
        });
      } else {
        toast({
          title: "Erro ao criar cobrança.",
          description: `${error}`,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leitura do medidor</DialogTitle>
          <DialogDescription>
            Leia através da câmera ou digite os dados manualmente.
          </DialogDescription>
        </DialogHeader>
        <div>
          <CameraReader
            onResult={({ serial }) => {
              setNumberMeter(serial);
            }}
          />
        </div>
        <ManualReadingForm
          valorKwh={valorKwh}
          setValorKwh={setValorKwh}
          dataAtual={dataAtual}
          setDataAtual={setDataAtual}
          numberMeter={numberMeter}
          setNumberMeter={setNumberMeter}
          onBuscar={handleClient}
          handlecobrance={handleCobrance}
          venciment={maturityDate}
          total={total}
        />
      </DialogContent>
    </Dialog>
  );
};
