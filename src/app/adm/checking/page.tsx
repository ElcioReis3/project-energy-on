"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TableAdm } from "@/components/tableAdm";
import { LogOut } from "lucide-react";
import { SkeletonAdm } from "@/components/skeletons/skeletonAdm";
import { useEffect } from "react";
import { RegisterClient } from "@/components/registerClient";
import { Button } from "@/components/ui/button";

export default function CheckingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== "loading") {
      console.log("Usuário não autenticado, redirecionando...");
      router.push("/adm/signin");
    }
  }, [session, status, router]);
  if (status === "loading") return <SkeletonAdm />;
  if (!session) return null;

  return (
    <div className="w-full max-w-3xl m-auto relative px-3">
      <div className="w-full h-32 flex items-center justify-center">
        <div className="text-xl font-semibold">Sistema de leitura</div>
      </div>
      <div className="max-w-3xl min-h-96 m-auto">
        <div className="flex gap-3">
          <Button>Ler Medidor</Button>
          <RegisterClient />
        </div>
        <div className="flex flex-col border my-11 p-3 rounded-md">
          <div className="font-semibold">Leituras</div>
          <TableAdm />
        </div>
      </div>
    </div>
  );
}
