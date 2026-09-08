import { NextResponse } from "next/server";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import { detectSpam, sanitize, validateLead } from "@/lib/validation";

/** Sempre dinâmica: recebe POST e não deve ser pré-renderizada. */
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;

/**
 * Recepção de leads do formulário comercial.
 *
 * Camadas, nesta ordem: tamanho do corpo, rate limit por IP, honeypot +
 * tempo de preenchimento, validação/sanitização. Só depois o lead é entregue
 * ao destino configurado.
 *
 * O webhook fica em variável de ambiente de servidor (sem prefixo
 * NEXT_PUBLIC_), então a URL nunca chega ao navegador.
 */
export async function POST(request: Request) {
  // 1. Corpo dentro de um tamanho razoável
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: "Mensagem muito longa." },
      { status: 413 },
    );
  }

  // 2. Rate limit por origem
  const identifier = getClientIdentifier(request.headers);
  const limit = checkRateLimit(identifier);

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  // 3. Corpo em JSON válido
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Requisição inválida." },
      { status: 400 },
    );
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // 4. Anti-spam — responde como sucesso para não ensinar o bot
  if (detectSpam({ website: raw.website, startedAt: raw.startedAt })) {
    return NextResponse.json({ ok: true });
  }

  // 5. Validação e sanitização no servidor (fonte da verdade)
  const { data, errors, valid } = validateLead(raw);

  if (!valid) {
    return NextResponse.json(
      { ok: false, message: "Revise os campos destacados.", errors },
      { status: 422 },
    );
  }

  // Parâmetros de origem, também sanitizados
  const utm: Record<string, string> = {};
  if (raw.utm && typeof raw.utm === "object" && !Array.isArray(raw.utm)) {
    for (const [key, value] of Object.entries(raw.utm)) {
      const cleanKey = sanitize(key, 40);
      const cleanValue = sanitize(value, 200);
      if (cleanKey && cleanValue) utm[cleanKey] = cleanValue;
    }
  }

  const lead = {
    ...data,
    utm,
    receivedAt: new Date().toISOString(),
    userAgent: sanitize(request.headers.get("user-agent"), 300),
  };

  // 6. Entrega ao destino configurado
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        console.error("[lead] webhook respondeu", response.status);
        return NextResponse.json(
          {
            ok: false,
            message:
              "Não conseguimos registrar seu contato agora. Tente novamente ou chame no WhatsApp.",
          },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error("[lead] falha ao entregar ao webhook", error);
      return NextResponse.json(
        {
          ok: false,
          message:
            "Não conseguimos registrar seu contato agora. Tente novamente ou chame no WhatsApp.",
        },
        { status: 502 },
      );
    }
  } else {
    // Sem destino configurado, o lead fica no log do servidor para não se perder.
    console.info("[lead] recebido (LEAD_WEBHOOK_URL não configurado)", {
      name: lead.name,
      company: lead.company,
      segment: lead.segment,
      receivedAt: lead.receivedAt,
    });
  }

  return NextResponse.json({ ok: true });
}
