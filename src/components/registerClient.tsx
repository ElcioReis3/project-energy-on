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
  privy: z.string(),
  email: z.string().email(),
  contact: z.string().optional(),
  meter: z.string(),
  count_meter: z.number().min(7),
  birth: z.string(),
});

export const RegisterClient = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      privy: "000.000.000-00",
      meter: "",
      birth: "",
      count_meter: 0,
      contact: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("privy", String(values.privy));
      formData.append("email", String(values.email));
      formData.append("contact", String(values.contact));
      formData.append("meter", values.meter);
      formData.append("count_meter", String(values.count_meter));
      formData.append("birth", String(values.birth));

      const response = await api.post("/adm/add-client", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
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
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input placeholder="Data de Nascimento" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meter"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">Série do medidor</FormLabel>
                  <FormControl>
                    <Input placeholder="Número série do medidor" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="count_meter"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">Kwh</FormLabel>
                  <FormControl>
                    <Input placeholder="Kwh atual" {...field} />
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
