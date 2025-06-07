"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import { useConsultStore } from "@/stores/useConsultStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const consultSchema = z.object({
  privy: z.string().refine(
    (val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length === 11 || digits.length === 14;
    },
    { message: "Digite um CPF (11) ou CNPJ (14) válido" }
  ),
  birth: z.string().min(1, "A data de nascimento é obrigatória"),
});

type ConsultFormType = z.infer<typeof consultSchema>;

export const ConsultDialog = ({ children }: { children: React.ReactNode }) => {
  const setClientConsult = useConsultStore((state) => state.setClientConsult);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ConsultFormType>({
    resolver: zodResolver(consultSchema),
    defaultValues: {
      privy: "",
      birth: "",
    },
  });

  const handleSubmit = async (data: ConsultFormType) => {
    setIsOpen(true);

    const response = await api.get("/consult-client", {
      params: data,
    });
    setClientConsult(response.data.clients);
    setIsOpen(false);
    if (!response.data.clients) {
      toast({
        title: "Dados incorretos",
        description: "Corrija os dados e tente novamente.",
        className: "text-red-500",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Consulte</DialogTitle>
          <DialogDescription>Sua via e outros serviços</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3 mt-4"
          >
            <FormField
              control={form.control}
              name="privy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF ou CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Digite aqui seu CPF ou CNPJ"
                      pattern="\d*"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Consultar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
