"use client";
import { Header } from "@/components/header";
import { TableClientes } from "@/components/Tables/TableClientes";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <Header visibility={false} />
      <div className="w-full max-w-3xl text-center font-semibold text-xl my-7 m-auto">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => router.push("/adm/checking")}
        />{" "}
        <span>Clientes</span>
      </div>
      <div className="w-full max-w-3xl m-auto">
        <TableClientes />
      </div>
    </div>
  );
}
