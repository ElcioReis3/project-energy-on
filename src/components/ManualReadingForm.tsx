"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InforClientDialog } from "./Dialogs/InforClientDialog";
import { Label } from "./ui/label";

type ManualReadingFormProps = {
  valorKwh: string;
  setValorKwh: (value: string) => void;
  selectDate: string;
  setDataAtual: (value: string) => void;
  numberMeter: string;
  setNumberMeter: (value: string) => void;
  onBuscar: () => void;
  handlecobrance: () => void;
  onClose?: () => void;
  venciment?: Date;
  total?: number | null;
};

export const ManualReadingForm = ({
  valorKwh,
  setValorKwh,
  selectDate,
  setDataAtual,
  numberMeter,
  setNumberMeter,
  onBuscar,
  handlecobrance,
  onClose,
}: ManualReadingFormProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="kwh">Leitura manual</Label>
      <Input
        id="kwh"
        type="text"
        placeholder="leitura Kwh"
        maxLength={6}
        minLength={6}
        inputMode="numeric"
        value={valorKwh}
        onChange={(e) => setValorKwh(e.target.value)}
      />
      <Label htmlFor="dateIn">Data da leitura</Label>
      <Input
        id="dateIn"
        type="date"
        value={selectDate}
        onChange={(e) => setDataAtual(e.target.value)}
      />
      <Label htmlFor="numberIn">Número de série do medidor</Label>
      <Input
        id="numberIn"
        type="text"
        placeholder="número série do medidor"
        value={numberMeter}
        onChange={(e) => setNumberMeter(e.target.value)}
      />

      <InforClientDialog
        kwh={valorKwh}
        onGerarCobranca={handlecobrance}
        onClose={onClose}
      >
        {valorKwh.length > 5 && numberMeter.length > 2 && (
          <Button className="w-full" onClick={onBuscar}>
            Buscar
          </Button>
        )}
      </InforClientDialog>
    </div>
  );
};
