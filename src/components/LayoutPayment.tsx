"use client";
import { CobranceType } from "@/types/cobranceType";
import { LogoMarca } from "./Logo";
import { Separator } from "./ui/separator";
import { formatDate, formatDateTime } from "@/services/formatDate";
import { QRCodeCanvas } from "qrcode.react";
import { useClientStore } from "@/stores/useClientStore";
import { getClient } from "@/app/api/apisGet";
import { useEffect } from "react";
import { maskPrivy } from "@/services/maskPrivy";
import Barcode from "react-barcode";

type Props = {
  data: CobranceType;
  refDiv: React.RefObject<HTMLDivElement | null>;
};

export const LayoutPayment = ({ data, refDiv }: Props) => {
  const client = useClientStore((state) => state.client);
  const setClient = useClientStore((state) => state.setClient);

  const qrValue = `
🔐 Cobrança de Energia

👤 Nome: ${data.name}
🔢 Medidor: ${data.meter}
⚡ Consumo: ${data.count_meter} kWh
💰 Valor: R$ ${data.price.toFixed(2)}
📅 Gerado em: ${formatDateTime(data.currentDate)}
📆 Vencimento: ${formatDateTime(data.maturityDate)}
📌 Status: ${data.status}
`;

  useEffect(() => {
    const onBuscar = async () => {
      const clientData = await getClient(data.meter);
      setClient(clientData);
    };
    onBuscar();
  }, []);

  const leituraAnterior =
    (client && client.count_meter[client.count_meter.length - 2]) ?? 0;

  const consumo = data.count_meter - leituraAnterior;

  return (
    <>
      <div ref={refDiv} className="w-full bg-white text-black p-3">
        <div className="flex items-center space-x-4 text-sm my-2">
          <LogoMarca />
          <Separator orientation="vertical" className="h-9" />
          <div className="text-sm">
            <div>CNPJ: 06.273.456/0001-17</div>
            <div>Endereço: Av. alexandre costa, nº17, Caxias-MA</div>
          </div>
          <Separator orientation="vertical" className="h-9" />
        </div>
        <Separator className="w-full" />
        <div className="flex gap-7 p-3 flex-wrap md:flex-nowrap">
          <div>
            <div className="my-2">
              <div>
                <span className="font-semibold">Nome:</span>
                <span>{data.name}</span>
              </div>
              {client && (
                <div>
                  <span className="font-semibold">CPF/CNPJ:</span>
                  <span>{maskPrivy(client.privy)}</span>
                </div>
              )}
              <div>
                <span className="font-semibold">Instalação:</span>
                <span>{data.meter}</span>
              </div>
              <div>
                <span className="font-semibold">Endereço:</span>
                <span>{client?.address}</span>
              </div>
            </div>
            <Separator className="w-72" />
            <div className="flex flex-col gap-2 p-2">
              <div className="flex flex-col border p-2">
                <div>Parceiro de negócio</div>
                <div>{Number(data.meter) / 2}</div>
              </div>
              <div className="flex flex-col border p-2">
                <div>Conta contrato</div>
                <div>{(Number(data.meter) / 2) * 3}</div>
              </div>
            </div>
          </div>
          <Separator orientation="vertical" className="sm:w-0 md:h-60" />
          <div className="w-full m-auto text-center">
            <p className="text-sm mt-2 font-semibold">QR Code</p>
            <QRCodeCanvas value={qrValue} size={180} className="m-auto" />
            <p className=" text-xs text-gray-500 mt-2">
              Apresente este QR Code para pagamento ou utilize os dados acima.
            </p>
          </div>
        </div>
        <Separator className="w-full" />
        <div className="flex items-center gap-3 p-3 justify-between">
          <div>
            <div className="font-semibold">Leitura Anterior:</div>
            <div>{leituraAnterior} kWh</div>
          </div>
          <div>
            <div className="font-semibold">Leitura Atual:</div>
            <div>{data.count_meter} kWh</div>
          </div>
          <div className="flex gap-3 text-xs flex-col md:flex-row md:text-base">
            <div>
              <div className="font-semibold">Tarifa Unit.(R$):</div>
              <div>0.75</div>
            </div>
            <div>
              <div className="font-semibold">Consumo:</div>
              <div>{consumo} kWh</div>
            </div>
          </div>
        </div>
        <Separator className="w-full" />
        <div className="flex items-center gap-1 p-3 justify-between">
          <div>
            <div className="font-semibold">Conta mês:</div>
            <div>{formatDate(data.currentDate)}</div>
          </div>
          <Separator orientation="vertical" className="h-9" />
          <div>
            <div className="font-semibold">Vencimento:</div>
            <div>{formatDate(data.maturityDate)}</div>
          </div>
          <Separator orientation="vertical" className="h-9" />
          <div>
            <div className="font-semibold">Total a pagar:</div>
            <div>R$ {data.price.toFixed(2)}</div>
          </div>
        </div>

        <Separator className="w-full" />
        <div className="w-full border mt-2">
          <div className="border p-1">Reaviso de Vencimento</div>
          <div className="w-full h-20 border"></div>
        </div>
        <div className="w-full border mt-2 h-20"></div>
        <Separator className="w-full" />
        <div className="w-full mt-4 flex justify-center">
          <Barcode
            value={`${data.meter}-${formatDate(data.maturityDate)}`}
            format="CODE128"
            height={60}
            width={2.3}
            displayValue={false}
          />
        </div>
      </div>
    </>
  );
};
