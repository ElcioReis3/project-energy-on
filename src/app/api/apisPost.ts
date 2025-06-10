import api from "@/services/api";
import { CobranceType } from "@/types/cobranceType";
import { userType } from "@/types/userType";

type Data = {
  client: userType;
  valorKwh: number;
  currentDate: Date;
  maturityDate: Date;
  total: number;
};

export const PostCreateCobrance = async (data: Data) => {
  const dateMaturity = new Date(data.currentDate);
  dateMaturity.setDate(dateMaturity.getDate() + 7);

  const dataCobrance = {
    name: data.client.name,
    count_meter: Number(data.valorKwh),
    meter: data.client.meter,
    currentDate: data.currentDate,
    maturityDate: dateMaturity,
    price: Number(data.total?.toFixed(2)),
    status: "ABERTO",
  };
  const response = await api.post("/create-cobrance", dataCobrance);
  const createCobranceData = response.data;
  return createCobranceData;
};
