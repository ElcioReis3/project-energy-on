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
import { userType } from "@/types/userType";
import { ManualReadingForm } from "../ManualReadingForm";
import { useToast } from "@/hooks/use-toast";
import { useClientStore } from "@/stores/useClientStore";
import { generateCobrance } from "@/utils/GenerateCobrance";
import { useCobranceStore } from "@/stores/useCobranceStore";
// import { CameraReader } from "../CameraReader";

export const ReadingDialog = ({ children }: { children: React.ReactNode }) => {
  const [numberMeter, setNumberMeter] = useState("");
  const [dataAtual, setDataAtual] = useState("");
  const [valorKwh, setValorKwh] = useState("");
  const [total, setTotal] = useState<number | null>(null);
  const client = useClientStore((state) => state.client);
  const setClient = useClientStore((state) => state.setClient);
  const cobrances = useCobranceStore((state) => state.cobrances);
  const setCobrances = useCobranceStore((state) => state.setCobrances);
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

  useEffect(() => {
    const hoje = new Date();
    const vencimento = new Date(hoje);
    vencimento.setDate(vencimento.getDate() + 7);

    setDataAtual(hoje.toISOString().split("T")[0]);
    setMaturityDate(vencimento);
  }, []);

  const handleCobrance = async () => {
    if (!client) return;
    const valorTotal = generateCobrance(valorKwh, client?.count_meter);
    if (valorTotal) {
      setTotal(valorTotal);
    }
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

      const response = await api.post("/create-cobrance", data);
      setCobrances([...cobrances, response.data]);
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
          <DialogDescription>Digite os dados manualmente.</DialogDescription>
        </DialogHeader>
        <div>
          {/* <CameraReader
            onResult={({ serial }) => {
              setNumberMeter(serial);
            }}
          /> */}
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
