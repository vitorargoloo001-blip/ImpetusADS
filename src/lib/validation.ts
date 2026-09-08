import type { LeadFieldErrors, LeadPayload } from "@/types";

/**
 * Validacao do formulario comercial.
 * O mesmo modulo roda no cliente (feedback imediato) e no servidor
 * (fonte da verdade) — o cliente nunca e confiavel sozinho.
 */

const MAX = {
  name: 120,
  whatsapp: 24,
  email: 160,
  company: 120,
  segment: 60,
  service: 60,
  goal: 60,
  message: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/**
 * Remove caracteres de controle e normaliza espacos.
 * A filtragem e feita por code point (e nao por classe de regex) para manter
 * o fonte legivel e evitar bytes invisiveis no arquivo.
 */
export function sanitize(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";

  let out = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    // C0 controls (0-31) e DEL (127) viram espaco
    out += code < 32 || code === 127 ? " " : char;
  }

  return out.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

/** Mantem apenas digitos de um telefone. */
function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function validateLead(input: unknown): {
  data: LeadPayload;
  errors: LeadFieldErrors;
  valid: boolean;
} {
  const raw = (input ?? {}) as Record<string, unknown>;

  const data: LeadPayload = {
    name: sanitize(raw.name, MAX.name),
    whatsapp: sanitize(raw.whatsapp, MAX.whatsapp),
    email: sanitize(raw.email, MAX.email).toLowerCase(),
    company: sanitize(raw.company, MAX.company),
    segment: sanitize(raw.segment, MAX.segment),
    service: sanitize(raw.service, MAX.service),
    goal: sanitize(raw.goal, MAX.goal),
    message: sanitize(raw.message, MAX.message),
  };

  const errors: LeadFieldErrors = {};

  if (data.name.length < 2) {
    errors.name = "Informe seu nome.";
  }

  const phoneDigits = normalizePhone(data.whatsapp);
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    errors.whatsapp = "Informe um WhatsApp válido com DDD.";
  }

  if (!EMAIL_RE.test(data.email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (data.company.length < 2) {
    errors.company = "Informe o nome da empresa.";
  }

  if (data.segment.length === 0) {
    errors.segment = "Selecione um segmento.";
  }

  if (data.goal.length === 0) {
    errors.goal = "Selecione um objetivo.";
  }

  if (data.message.length > 0 && data.message.length < 10) {
    errors.message = "Conte um pouco mais sobre o desafio.";
  }

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

/** Campos usados na deteccao de spam, enviados junto ao payload. */
export interface AntiSpamFields {
  /** Honeypot: preenchido apenas por bot. */
  website?: unknown;
  /** Momento em que o formulario foi montado (epoch ms). */
  startedAt?: unknown;
}

/** Tempo minimo plausivel de preenchimento humano. */
const MIN_FILL_MS = 2500;

export function detectSpam(fields: AntiSpamFields): boolean {
  if (typeof fields.website === "string" && fields.website.trim().length > 0) {
    return true;
  }

  const startedAt = Number(fields.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0) {
    if (Date.now() - startedAt < MIN_FILL_MS) return true;
  }

  return false;
}
