/**
 * Prova social do hero.
 *
 * `brandsServed` comeca em null de proposito: o numero de marcas atendidas
 * precisa ser confirmado antes de virar afirmacao publica. Enquanto for null,
 * o site usa a versao sem numero — a composicao nao muda.
 *
 * Assim que o dado estiver confirmado, basta preencher (ex.: 50).
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
