import { create } from "zustand";
import { userType } from "@/types/userType"; // ajuste o caminho conforme seu projeto

type ClientStore = {
  client: userType | null;
  setClient: (client: userType) => void;
  clearClient: () => void;
};

export const useClientStore = create<ClientStore>((set) => ({
  client: null,
  setClient: (client) => set({ client }),
  clearClient: () => set({ client: null }),
}));
