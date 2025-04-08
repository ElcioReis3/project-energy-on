import { CobranceType } from "@/types/cobranceType";
import { create } from "zustand";

type CobranceStore = {
  cobrances: CobranceType[];
  setCobrances: (data: CobranceType[]) => void;
};

export const useCobranceStore = create<CobranceStore>((set) => ({
  cobrances: [],
  setCobrances: (data) => set({ cobrances: data }),
}));
