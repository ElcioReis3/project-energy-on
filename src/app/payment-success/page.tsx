"use client";

import { Header } from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [count, setCount] = useState(30);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          router.push("/");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <>
      <Header visibility={false} />
      <div className="w-full h-full flex justify-center items-center text-center flex-col gap-4 text-xl">
        <div>Seu pagamento foi aprovado!</div>
        <div>Aguarde só um instante... {count}s</div>
      </div>
    </>
  );
}
