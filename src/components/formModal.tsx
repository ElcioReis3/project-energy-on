"use client";

import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const carSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.string(),
  valor: z.number().min(0),
  images: z.union([z.custom<FileList>(), z.array(z.string())]).optional(),
});

type CarFormSchema = z.infer<typeof carSchema>;

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Partial<CarFormSchema>;
  onSave: (data: CarFormSchema) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}) => {
  const form = useForm<CarFormSchema>({
    resolver: zodResolver(carSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: CarFormSchema) => {
    try {
      onSave(data);
      onClose();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Ocorreu um erro ao editar os dados. Tente novamente"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Editar Carro</h2>
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">Status</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="disponível">Disponível</SelectItem>
                          <SelectItem value="vendido">Vendido</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valor"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <FormLabel className="px-3">Valor</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10.000"
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(isNaN(value) ? 0 : value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Salvar
            </Button>
          </form>
        </Form>
        <Button className="w-full mt-2" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default EditModal;
