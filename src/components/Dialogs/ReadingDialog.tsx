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
import { ManualReadingForm } from "../ManualReadingForm";
import { useToast } from "@/hooks/use-toast";
import { useClientStore } from "@/stores/useClientStore";
import { generateCobrance } from "@/utils/GenerateCobrance";
import { useCobranceStore } from "@/stores/useCobranceStore";
import { getClient, getConsultMeter } from "@/app/api/apisGet";
import { PostCreateCobrance } from "@/app/api/apisPost";
import { getHoursTime } from "@/services/formatDate";
// import { CameraReader } from "../CameraReader";

export const ReadingDialog = ({ children }: { children: React.ReactNode }) => {
  const [numberMeter, setNumberMeter] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [valorKwh, setValorKwh] = useState("");
  const [total, setTotal] = useState<number | null>(null);
  const client = useClientStore((state) => state.client);
  const setClient = useClientStore((state) => state.setClient);
  const cobrances = useCobranceStore((state) => state.cobrances);
  const setCobrances = useCobranceStore((state) => state.setCobrances);
  const [maturityDate, setMaturityDate] = useState(new Date());
  const [ultimaCobranca, setUltimaCobranca] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const date = new Date();
    setSelectDate(date.toISOString().split("T")[0]);
  }, []);

  const handleClient = async () => {
    try {
      // Buscar cliente
      const clientData = await getClient(numberMeter);
      setClient(clientData);
    } catch (error) {
      toast({ title: "Número de série do medidor não encontrado" });
    }
  };

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
      const DateTimeHours = getHoursTime(selectDate);

      const data = {
        client,
        valorKwh: Number(valorKwh),
        currentDate: DateTimeHours,
        maturityDate,
        total,
      };

      const createCobranceData = await PostCreateCobrance(data);
      setCobrances([...cobrances, createCobranceData]);
      toast({ title: "Cobrança criada com sucesso!" });
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
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
          selectDate={selectDate}
          setDataAtual={setSelectDate}
          numberMeter={numberMeter}
          setNumberMeter={setNumberMeter}
          onBuscar={handleClient}
          handlecobrance={handleCobrance}
          onClose={() => setOpen(false)}
          venciment={maturityDate}
          total={total}
        />
      </DialogContent>
    </Dialog>
  );
};
