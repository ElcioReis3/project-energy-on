import api from "@/services/api";
import { create } from "zustand";

type Cliente = {
  id: string;
  name: string;
  address?: string;
  contact?: string;
  email: string;
  privy: string;
  birth: string;
  meter: string;
  count_meter: number[];
};

type ClientesStore = {
  clientes: Cliente[];
  fetchClientes: () => Promise<void>;
};

export const useListClientesStore = create<ClientesStore>((set) => ({
  clientes: [],
  fetchClientes: async () => {
    const response = await api.get("/consult-client");
    const data = response.data;
    set({ clientes: data.clients });
  },
}));
