import { site } from "@/data/site";
import { readUtmParams } from "@/lib/analytics";

/**
 * Monta o link do WhatsApp com a mensagem de abertura.
 *
 * A mensagem que a pessoa envia fica limpa — é ela quem aparece na conversa.
 * A atribuição de campanha (UTM), quando existe, vai numa linha separada ao
 * final, para o time comercial saber de onde veio o contato. Qual botão foi
 * clicado não entra na mensagem: isso já é registrado no analytics.
 */

export const defaultWhatsappMessage =
  "Olá, vim pelo site da Impetus ADS e gostaria de falar com um especialista";

interface WhatsappOptions {
  /** Mensagem pré-preenchida. */
  message?: string;
  /** Identifica o ponto do site que originou o clique (só para analytics). */
  source?: string;
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function buildWhatsappUrl({
  message = defaultWhatsappMessage,
}: WhatsappOptions = {}): string {
  const digits = digitsOnly(site.contact.whatsapp);

  // Sem número configurado, direciona para a página de contato
  // em vez de gerar um link quebrado.
  if (!digits) return "/contato";

  const utm = readUtmParams();
  const utmLine = Object.entries(utm)
    .map(([key, value]) => `${key}=${value}`)
    .join(" | ");

  const text = utmLine ? `${message}\n\n[${utmLine}]` : message;

  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/** Versão para render no servidor: sem UTM, que só existe no cliente. */
export function buildStaticWhatsappUrl(
  message = defaultWhatsappMessage,
): string {
  const digits = digitsOnly(site.contact.whatsapp);
  if (!digits) return "/contato";
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
