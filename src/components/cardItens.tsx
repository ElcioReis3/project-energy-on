"use client";
import { useConsultStore } from "@/stores/useConsultStore";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { TableConsult } from "./Tables/TableConsult";

export const CardItens = () => {
  const { clientConsult } = useConsultStore((state) => state);

  return (
    <div className="w-full">
      {clientConsult && (
        <>
          <div className="w-max p-7">
            <div className="font-semibold">Olá {clientConsult.name}</div>
            <div className="text-muted-foreground">
              Essa agência é para você.
            </div>
            <Separator />
            <div className="border p-2 rounded-md mt-2 bg-gray-300">
              Medidor: {clientConsult?.meter}
            </div>
          </div>
          <Card className="border my-7 mx-7">
            {clientConsult && (
              <>
                <CardTitle className="text-lg text-center p-3">
                  Selecione a Fatura
                </CardTitle>
                <CardDescription className="w-96 px-3 m-auto">
                  Por aqui você faz uma busca por débitos e emite a segunda via
                  gratuita das suas contas.
                </CardDescription>
                <CardContent className="my-7">
                  <TableConsult />
                </CardContent>
              </>
            )}
          </Card>
        </>
      )}
    </div>
  );
};
