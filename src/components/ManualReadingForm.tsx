"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InforClientDialog } from "./Dialogs/InforClientDialog";

type ManualReadingFormProps = {
  valorKwh: string;
  setValorKwh: (value: string) => void;
  dataAtual: string;
  setDataAtual: (value: string) => void;
  numberMeter: string;
  setNumberMeter: (value: string) => void;
  onBuscar: () => void;
  handlecobrance: () => void;
  venciment?: Date;
  total?: number | null;
};

export const ManualReadingForm = ({
  valorKwh,
  setValorKwh,
  dataAtual,
  setDataAtual,
  numberMeter,
  setNumberMeter,
  onBuscar,
  handlecobrance,
}: ManualReadingFormProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div>Leitura manual</div>

      <Input
        type="text"
        placeholder="leitura Kwh"
        maxLength={6}
        minLength={6}
        inputMode="numeric"
        value={valorKwh}
        onChange={(e) => setValorKwh(e.target.value)}
      />
      <Input
        type="date"
        value={dataAtual}
        onChange={(e) => setDataAtual(e.target.value)}
      />
      <Input
        type="text"
        placeholder="número série do medidor"
        value={numberMeter}
        onChange={(e) => setNumberMeter(e.target.value)}
      />

      <InforClientDialog kwh={valorKwh} onGerarCobranca={handlecobrance}>
        {valorKwh.length > 5 && numberMeter.length > 2 && (
          <Button className="w-full" onClick={onBuscar}>
            Buscar
          </Button>
        )}
      </InforClientDialog>
    </div>
  );
};
