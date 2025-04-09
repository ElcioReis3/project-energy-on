"use client";
import { Header } from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 7000);
  });
  return (
    <>
      <Header visibility={false} />
      <div className="w-full h-full flex justify-center items-center">
        <div>Pagamento aprovado!</div>
      </div>
    </>
  );
}
