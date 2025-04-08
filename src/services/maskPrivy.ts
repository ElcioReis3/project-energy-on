export function maskPrivy(privy: string) {
  if (!privy) return "";

  // Remove qualquer caractere que não seja número
  const clean = privy.replace(/\D/g, "");

  if (clean.length === 11) {
    // CPF: mostra os 3 primeiros e os 2 últimos dígitos
    return clean.replace(/^(\d{3})\d{5}(\d{3})$/, "$1*****$2");
  } else if (clean.length === 14) {
    // CNPJ: mostra os 2 primeiros e os 2 últimos dígitos
    return clean.replace(/^(\d{2})\d{10}(\d{2})$/, "$1**********$2");
  }

  return privy;
}
