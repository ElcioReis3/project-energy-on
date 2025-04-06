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
import { Controller, useForm } from "react-hook-form";

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingImages: string[] | FileList;
  carId?: string;
  onSave: (images: FileList) => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  carId,
  onSave,
}) => {
  const form = useForm({
    defaultValues: {
      images: undefined as FileList | undefined,
    },
  });

  const onSubmit = (data: { images: FileList | undefined }) => {
    if (data.images) {
      onSave(data.images);
      onClose();
    } else {
      alert("Por favor, selecione pelo menos uma foto.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Adicionar Fotos</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fotos</FormLabel>
                  <FormControl>
                    <Controller
                      name="images"
                      control={form.control}
                      render={({ field: { onChange } }) => (
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                              onChange(files);
                            }
                          }}
                        />
                      )}
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

export default PhotoModal;
