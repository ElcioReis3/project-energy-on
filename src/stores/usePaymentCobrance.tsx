import { create } from "zustand";

interface Payment {
  id: string;
  name: string;
  count_meter: number;
  currentDate: Date;
  maturityDate: Date;
  meter: string;
  price: Number;
  status: "ABERTO" | "PAGO" | "VENCIDO";
  idCobrance?: string;
}

interface PaymentCobranceStore {
  payment: Payment | undefined;
  setPaymentCobrance: (payment: Payment) => void;
  clearPaymentCobrance: () => void;
}

const usePaymentCobranceStore = create<PaymentCobranceStore>((set) => ({
  payment: undefined,
  setPaymentCobrance: (payment) => set({ payment }),
  clearPaymentCobrance: () => set({ payment: undefined }),
}));

export default usePaymentCobranceStore;
