/**
 * Prova social do hero.
 *
 * Com `brandsServed` preenchido, a frase exibe o número de marcas atendidas.
 * Com `null`, usa a versão sem número — a composição é a mesma nos dois casos.
 */
export const socialProof: {
  brandsServed: number | null;
  closingLine: string;
} = {
  brandsServed: null,
  closingLine: "A sua pode ser a próxima.",
};

export function proofHeadline(): string {
  if (socialProof.brandsServed === null) {
    return "Marcas de diferentes mercados já cresceram com a Impetus.";
  }
  return `+${socialProof.brandsServed} marcas já cresceram com a Impetus.`;
}
