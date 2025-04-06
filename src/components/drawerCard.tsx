"use client";
import Image from "next/image";
import { CardGrid } from "./cardItens";
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
import { userType } from "@/types/userType";

type Props = {
  item: userType;
};
export const DrawerCard = ({ item }: Props) => {
  const { name, address, email, contact, privy } = item;

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
      <DialogTrigger>
        {" "}
        <CardGrid item={item} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription className="flex flex-col">
            <span>{address}</span>
            <span>{contact}</span>
          </DialogDescription>
        </DialogHeader>
        <Carousel>
          <CarouselContent className="w-full"></CarouselContent>
          <CarouselPrevious className="disabled:opacity-0 cursor-default" />
          <CarouselNext className="disabled:opacity-0 cursor-default" />
        </Carousel>
        <Button onClick={() => handleAddButton()}>Tenho Interesse</Button>
      </DialogContent>
    </Dialog>
  );
};
