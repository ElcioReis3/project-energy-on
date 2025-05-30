import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  children: React.ReactNode;
  handleDelete: () => void;
};

export const DialogConfirm = ({ children, handleDelete }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja realmente deletar esse cliente?</DialogTitle>
          <DialogDescription>Essa ação não tem volta.</DialogDescription>
        </DialogHeader>
        <Button onClick={handleDelete} variant="destructive">
          Deletar
        </Button>
      </DialogContent>
    </Dialog>
  );
};
