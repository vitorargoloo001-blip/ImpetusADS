/** Junta classes condicionais sem dependencia externa. */
export function cn(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Separa a metrica em numero e sufixo para o contador animado.
 * "+223%"  -> { prefix: "+", number: 223,   suffix: "%" }
 * "+45,9%" -> { prefix: "+", number: 45.9,  suffix: "%", decimals: 1 }
 * Retorna null quando o valor nao e numerico (destaque qualitativo).
 */
export function parseMetric(value: string): {
  prefix: string;
  number: number;
  suffix: string;
  decimals: number;
} | null {
  const match = /^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/.exec(value.trim());
  if (!match) return null;

  const [, prefix = "", digits = "", suffix = ""] = match;
  const normalized = digits.replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  if (Number.isNaN(parsed)) return null;

  const decimalPart = normalized.split(".")[1];

  return {
    prefix,
    number: parsed,
    suffix,
    decimals: decimalPart ? decimalPart.length : 0,
  };
}

/** Formata numero no padrao brasileiro (virgula decimal). */
export function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
