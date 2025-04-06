"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/services/api";
import { OTPInput } from "@/components/Otp/OTPinput";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

const otpSchema = z.object({
  otp: z.string(),
});

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [email, setEmail] = useState<string | null>(null); // Armazena o email
  const [otpValue, setOtpValue] = useState(""); // Novo estado para armazenar o valor do OTP
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Função para enviar o OTP para o backend
  const sendOtp = async (email: string) => {
    try {
      const response = await api.post("/adm/auth/sendotp", { email });
      if (response.status === 200) {
        setEmail(email); // Armazena o email
        setIsOtpMode(true); // Muda para o modo OTP
      }
    } catch (error) {
      console.error("Erro ao enviar OTP:", error);
      setErrorMessage("Erro ao enviar OTP.");
    }
  };

  const onSubmit = async (values: { email: string; password: string }) => {
    setErrorMessage(null);
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: undefined,
    });

    if (result?.ok) {
      await sendOtp(values.email); // Envia o OTP para o backend
    } else {
      setErrorMessage("Email ou senha incorretos!");
    }
    setIsLoading(false);
  };

  const onOtpSubmit = async () => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await api.post("/adm/auth/verifyotp", {
        email, // Envia o email armazenado
        otp: otpValue,
      });

      if (response.data.success) {
        router.push("/adm/checking");
      } else {
        setErrorMessage("Código OTP inválido ou expirado!");
      }
    } catch (error) {
      setErrorMessage("Erro ao verificar o código OTP.");
    }
    setIsLoading(false);
  };

  return (
    <div className="m-auto max-w-xl py-16 px-3">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Login Administrativo
      </h1>
      {errorMessage && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-500 rounded">
          {errorMessage}
        </div>
      )}
      {isOtpMode ? (
        <div className="w-full max-w-max m-auto space-y-7">
          <OTPInput
            length={6}
            onChange={(value) => {
              setOtpValue(value);
            }}
          />
          <Button className="w-full" onClick={onOtpSubmit} disabled={isLoading}>
            {isLoading ? "Verificando..." : "CONFIRMAR OTP"}
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E-mail"
                      {...field}
                      disabled={isOtpMode}
                    />
                  </FormControl>
                  <FormDescription>Digite seu e-mail</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Senha" {...field} />
                  </FormControl>
                  <FormDescription>Digite sua senha</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Entrando..." : "ENTRAR"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
