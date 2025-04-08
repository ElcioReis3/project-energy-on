export type CobranceType = {
  id: string;
  name: string;
  count_meter: number;
  currentDate: Date;
  maturityDate: Date;
  meter: string;
  price: Number;
  status: "ABERTO" | "PAGO" | "VENCIDO";
};
