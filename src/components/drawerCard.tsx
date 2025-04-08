"use client";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useConsultStore } from "@/stores/useConsultStore";
import { CardItens } from "./cardItens";
import React from "react";

export const DrawerCard = ({ children }: { children: React.ReactNode }) => {
  const { clientConsult } = useConsultStore((state) => state);

  const handleAddButton = () => {
    const phoneNumber = "5599912341234";
    const message = `Olá estou interessado no veículo ${name}.`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{clientConsult?.name}</DialogTitle>
          <DialogDescription className="flex flex-col">
            <span>{clientConsult?.address}</span>
            <span>{clientConsult?.contact}</span>
          </DialogDescription>
        </DialogHeader>
        <Carousel>
          <CarouselContent className="w-full"></CarouselContent>
          <CarouselPrevious className="disabled:opacity-0 cursor-default" />
          <CarouselNext className="disabled:opacity-0 cursor-default" />
        </Carousel>
        <Button onClick={() => handleAddButton()}>Gerar</Button>
      </DialogContent>
    </Dialog>
  );
};
