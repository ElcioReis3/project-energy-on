import api from "@/services/api";
import { CobranceType } from "@/types/cobranceType";
import { userType } from "@/types/userType";

export const getConsultMeter = async (meter?: string) => {
  if (meter) {
    const response = await api.get("/consult-meter", {
      params: { meter },
    });
    const cobrances = response.data.cobrances;
    return cobrances;
  } else {
    const response = await api.get("/consult-meter");
    const cobrances = response.data.cobrances;
    return cobrances;
  }
};

export const getClient = async (numberMeter?: string) => {
  if (numberMeter) {
    const response = await api.get(`/get-client/?meter=${numberMeter}`);
    const clientData = response.data.client;
    return clientData;
  } else {
    const response = await api.get(`/get-client`);
    const clientsData = response.data.client;
    return clientsData;
  }
};
