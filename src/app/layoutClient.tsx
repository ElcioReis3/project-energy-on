"use client";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/adm/checking");
  }, []);
  return <SessionProvider>{children}</SessionProvider>;
}
