export function formatCurrencyInput(value: string): string {
  // Remove todos os caracteres que não são números
  const numericValue = value.replace(/\D/g, "");

  // Se estiver vazio, retorna "R$ 0,00"
  if (!numericValue) return "R$ 0,00";

  // Converte para número e divide por 100 para formatar corretamente
  const floatValue = Number(numericValue) / 100;

  return floatValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}



export function parseCurrencyToCents(value: string): number {
  // Remove tudo que não for número
  const numericValue = value.replace(/\D/g, "");

  // Converte para número inteiro (centavos)
  return numericValue ? parseInt(numericValue, 10) : 0;
}

