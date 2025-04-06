"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "@/services/api";

const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  meter: z.string(),
  privy: z.string(),
  email: z.string().email(),
  contact: z.string(),
});

export const RegisterClient = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      meter: "",
      privy: "000.000.000-00",
      contact: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("meter", values.meter);
      formData.append("privy", String(values.privy));
      formData.append("email", String(values.email));
      formData.append("contact", String(values.contact));

      const response = await api.post("/adm/add-client", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.location.reload();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Ocorreu um erro ao enviar os dados. Tente novamente"
      );
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Adicionar Cliente</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meter"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">Número do medidor</FormLabel>
                  <FormControl>
                    <Input placeholder="Número do medidor" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefone" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privy"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">CPF ou CNPJ</FormLabel>
                  <FormControl>
                    <Input placeholder="CPF ou CNPJ" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              ADICIONAR
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
