"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { segments } from "@/data/segments";
import { services } from "@/data/services";
import { analyticsEvents, readUtmParams, track } from "@/lib/analytics";
import { validateLead } from "@/lib/validation";
import type { LeadFieldErrors } from "@/types";
import { cn } from "@/lib/utils";

const goals = [
  "Gerar mais leads qualificados",
  "Construir marca e autoridade",
  "Lançar um produto ou empreendimento",
  "Estruturar tráfego pago",
  "Produzir conteúdo e audiovisual",
  "Desenvolver site ou sistema",
  "Outro",
];

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full border-b border-line bg-transparent pb-2.5 pt-1 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-accent";

export function ContactForm() {
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedAt = useRef(Date.now());
  const started = useRef(false);

  /** Dispara form_start uma única vez, na primeira interação real. */
  const handleFirstInput = () => {
    if (started.current) return;
    started.current = true;
    track(analyticsEvents.formStart);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // Validação no cliente: feedback imediato. O servidor revalida tudo.
    const { data, errors: found, valid } = validateLead(payload);
    setErrors(found);

    if (!valid) {
      setStatus("idle");
      const firstField = Object.keys(found)[0];
      if (firstField) {
        document
          .querySelector<HTMLElement>(`[name="${firstField}"]`)
          ?.focus();
      }
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          website: formData.get("website"),
          startedAt: startedAt.current,
          utm: readUtmParams(),
        }),
      });

      const result: { ok?: boolean; message?: string; errors?: LeadFieldErrors } =
        await response.json();

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus("error");
        setServerMessage(
          result.message ??
            "Não foi possível enviar agora. Tente novamente em instantes.",
        );
        return;
      }

      track(analyticsEvents.formSubmit, { segment: data.segment });
      setStatus("success");
    } catch {
      setStatus("error");
      setServerMessage(
        "Não foi possível enviar agora. Verifique sua conexão e tente novamente.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-line rounded-lg bg-surface p-8 lg:p-12"
      >
        <span aria-hidden="true" className="block h-px w-12 bg-accent" />
        <h2 className="display-compact mt-6">Recebemos seu contato.</h2>
        <p className="lead mt-4 max-w-lg">
          Nossa equipe vai analisar o seu cenário e responder em até um dia
          útil. Se preferir adiantar a conversa, chame no WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onInput={handleFirstInput}
      noValidate
      className="border border-line rounded-lg bg-surface p-6 lg:p-10"
    >
      {/* Honeypot: invisível para pessoas, atrativo para bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto">
        <label htmlFor="website">Não preencha este campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <Field
          label="Nome"
          name="name"
          autoComplete="name"
          required
          error={errors.name}
        />
        <Field
          label="WhatsApp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          required
          error={errors.whatsapp}
        />
        <Field
          label="E-mail"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          error={errors.email}
        />
        <Field
          label="Empresa"
          name="company"
          autoComplete="organization"
          required
          error={errors.company}
        />

        <SelectField
          label="Segmento"
          name="segment"
          required
          error={errors.segment}
          options={[...segments.map((s) => s.name), "Outro"]}
        />
        <SelectField
          label="Serviço procurado"
          name="service"
          error={errors.service}
          options={[...services.map((s) => s.title), "Ainda não sei"]}
        />

        <div className="sm:col-span-2">
          <SelectField
            label="Objetivo principal"
            name="goal"
            required
            error={errors.goal}
            options={goals}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted"
          >
            Conte sobre o desafio
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(fieldBase, "mt-3 resize-none")}
            placeholder="Contexto, meta e prazo ajudam a preparar uma conversa melhor."
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-[0.75rem] text-accent-strong">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {status === "error" && serverMessage && (
        <p
          role="alert"
          className="mt-7 border-l-2 border-accent-strong pl-4 text-[0.875rem] text-ink-soft"
        >
          {serverMessage}
        </p>
      )}

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[0.875rem] font-medium text-white transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Enviando…" : "Enviar mensagem"}
          <ArrowRight className="arrow-shift size-4" />
        </button>

        <p className="text-[0.75rem] leading-relaxed text-muted-soft sm:max-w-xs sm:text-right">
          Ao enviar, você concorda com nossa{" "}
          <a href="/privacidade" className="underline hover:text-ink">
            Política de Privacidade
          </a>
          .
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

function Field({
  label,
  name,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  required,
  error,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(fieldBase, "mt-3")}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-[0.75rem] text-accent-strong">
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  error?: string;
}

function SelectField({
  label,
  name,
  options,
  required,
  error,
}: SelectFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(fieldBase, "mt-3 cursor-pointer appearance-none")}
      >
        <option value="" disabled>
          Selecione
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-[0.75rem] text-accent-strong">
          {error}
        </p>
      )}
    </div>
  );
}
