import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ReadingDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leitura do medidor</DialogTitle>
          <DialogDescription>
            {" "}
            Leia através da câmera ou digite os dados manualmente.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Button>Abrir câmera</Button>
        </div>
        <div>
          <div>Leitura manual</div>
          <div className="flex flex-col gap-2">
            <Input type="text" placeholder="leitura" />
            <Input type="date" placeholder="data" />
            <Input type="text" placeholder="número do medidor" />
            <Input type="text" placeholder="Cliente" />
            <Button>Gerar QR Code</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
