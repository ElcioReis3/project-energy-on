import { create } from "zustand";
import { userType } from "@/types/userType"; // ajuste o caminho conforme seu projeto

type ConsultStore = {
  clientConsult: userType | null;
  setClientConsult: (clientConsult: userType) => void;
  clearClient: () => void;
};

export const useConsultStore = create<ConsultStore>((set) => ({
  clientConsult: null,
  setClientConsult: (clientConsult) => set({ clientConsult }),
  clearClient: () => set({ clientConsult: null }),
}));
