"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Banner = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/about");
  }, []);

  return (
    <div className="w-full h-[430px] bg-orange-700 flex flex-col-reverse justify-center items-center p-7 gap-2 sm:flex-row ">
      <div className="max-w-2xl flex flex-col items-center gap-3 ">
        <p className="max-w-lg text-xl text-center text-primary-foreground md:text-3xl">
          Saiba como a eficiência energética pode te ajudar.
        </p>
        <Button
          className="bg-destructive-foreground text-foreground"
          onClick={() => {
            router.push("/about");
          }}
        >
          Sobre nós
        </Button>
      </div>
    </div>
  );
};
