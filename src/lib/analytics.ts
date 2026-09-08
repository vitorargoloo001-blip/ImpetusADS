/**
 * Camada central de analytics.
 *
 * Nenhum componente chama gtag/fbq/dataLayer diretamente: todos passam por
 * `track()`. Isso mantem um unico ponto para renomear eventos, adicionar
 * destinos (PostHog, por exemplo) ou desligar tudo.
 *
 * Se nenhum ID estiver configurado, `track()` vira no-op silencioso.
 */

export const analyticsEvents = {
  heroCtaClick: "hero_cta_click",
  caseOpen: "case_open",
  serviceClick: "service_click",
  segmentClick: "segment_click",
  whatsappClick: "whatsapp_click",
  formStart: "form_start",
  formSubmit: "form_submit",
  manifestoPlay: "manifesto_play",
} as const;

export type AnalyticsEvent =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];

export type AnalyticsParams = Record<
  string,
  string | number | boolean | undefined
>;

interface AnalyticsWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}

/** Eventos com equivalente nomeado no Meta Pixel. */
const metaPixelMap: Partial<Record<AnalyticsEvent, string>> = {
  form_submit: "Lead",
  whatsapp_click: "Contact",
};

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const w = window as AnalyticsWindow;

  // Filtra chaves indefinidas para nao poluir o payload.
  const payload: AnalyticsParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }

  try {
    // Google Tag Manager
    w.dataLayer?.push({ event, ...payload });

    // GA4 direto (quando nao ha GTM)
    w.gtag?.("event", event, payload);

    // Meta Pixel
    const metaEvent = metaPixelMap[event];
    if (metaEvent) {
      w.fbq?.("track", metaEvent, payload);
    } else {
      w.fbq?.("trackCustom", event, payload);
    }
  } catch {
    // Analytics nunca pode quebrar a navegacao.
  }
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

const UTM_STORAGE_KEY = "impetus:utm";

/**
 * Guarda os parametros de origem na primeira visita da sessao.
 * Sao reaproveitados no link do WhatsApp e no envio do formulario, para que a
 * origem do lead sobreviva a navegacao entre paginas.
 */
export function captureUtmParams() {
  if (typeof window === "undefined") return;

  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};

    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) found[key] = value;
    }

    if (Object.keys(found).length === 0) return;

    const stored = readUtmParams();
    window.sessionStorage.setItem(
      UTM_STORAGE_KEY,
      JSON.stringify({ ...stored, ...found }),
    );
  } catch {
    // sessionStorage pode estar bloqueado — seguimos sem atribuicao.
  }
}

export function readUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, string>;
    }
    return {};
  } catch {
    return {};
  }
}
