import Image from "next/image";
import type { ClientBrand } from "@/types";
import { cn } from "@/lib/utils";

interface ClientLogoProps {
  brand: ClientBrand;
  /** Escala do lockup. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * Logotipo de cliente.
 *
 * Quando `brand.logoSrc` existir, renderiza o arquivo oficial com
 * `object-fit: contain` — nunca distorce. Enquanto o arquivo nao chega,
 * monta um lockup tipografico com o mesmo peso visual da referencia,
 * em vez de recriar arte de marca de terceiros.
 */
export function ClientLogo({ brand, size = "md", className }: ClientLogoProps) {
  if (brand.logoSrc) {
    return (
      <Image
        src={brand.logoSrc}
        alt={`${brand.name} ${brand.qualifier ?? ""}`.trim()}
        width={200}
        height={64}
        className={cn("h-full w-auto object-contain", className)}
      />
    );
  }

  const scale =
    size === "sm"
      ? { name: "text-sm", qualifier: "text-[0.4375rem]", mono: "text-lg" }
      : { name: "text-lg sm:text-xl", qualifier: "text-[0.5rem]", mono: "text-2xl" };

  // "Salonca Advogados": monograma a esquerda, nome em duas linhas
  if (brand.lockup === "serif") {
    return (
      <span className={cn("inline-flex items-center gap-2.5", className)}>
        <span className={cn("font-bold tracking-tight", scale.mono)}>
          {brand.monogram}
        </span>
        <span className="flex flex-col leading-[1.05]">
          <span className={cn("font-semibold tracking-tight", scale.name)}>
            {brand.name}
          </span>
          {brand.qualifier && (
            <span className={cn("font-medium tracking-tight", scale.name)}>
              {brand.qualifier}
            </span>
          )}
        </span>
      </span>
    );
  }

  // "MB Grupo": monograma grande com descritor abaixo
  if (brand.lockup === "monogram") {
    return (
      <span className={cn("inline-flex flex-col items-center", className)}>
        <span className={cn("font-extrabold tracking-[-0.05em]", scale.mono)}>
          {brand.name}
        </span>
        {brand.qualifier && (
          <span
            className={cn(
              "mt-0.5 font-medium uppercase tracking-[0.4em] indent-[0.4em]",
              scale.qualifier,
            )}
          >
            {brand.qualifier}
          </span>
        )}
      </span>
    );
  }

  // "Uniqueness Sports": nome forte, descritor espacado abaixo
  if (brand.lockup === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-center", className)}>
        <span
          className={cn(
            "font-bold uppercase tracking-[0.06em]",
            scale.name,
          )}
        >
          {brand.name}
        </span>
        {brand.qualifier && (
          <span
            className={cn(
              "mt-0.5 font-medium uppercase tracking-[0.42em] indent-[0.42em]",
              scale.qualifier,
            )}
          >
            {brand.qualifier}
          </span>
        )}
      </span>
    );
  }

  // "ZENIT" / "FLEX": caixa alta bem espacada, descritor fino abaixo
  return (
    <span className={cn("inline-flex flex-col items-center", className)}>
      <span
        className={cn(
          "font-semibold uppercase tracking-[0.32em] indent-[0.32em]",
          scale.name,
        )}
      >
        {brand.name}
      </span>
      {brand.qualifier && (
        <span
          className={cn(
            "mt-1 font-medium uppercase tracking-[0.38em] indent-[0.38em]",
            scale.qualifier,
          )}
        >
          {brand.qualifier}
        </span>
      )}
    </span>
  );
}
