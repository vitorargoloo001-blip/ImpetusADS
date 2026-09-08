import type { SVGProps } from "react";
import type { ServiceIcon } from "@/types";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function Play(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9 6.5v11a.6.6 0 0 0 .92.5l8.5-5.5a.6.6 0 0 0 0-1L9.92 6a.6.6 0 0 0-.92.5Z" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7.5h17" />
      <path d="M3.5 16.5h17" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Linkedin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10.5V17" />
      <circle cx="7.5" cy="7.3" r="1.05" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-3.6a2.4 2.4 0 0 1 4.8 0V17" />
      <path d="M11.5 10.5V17" />
    </svg>
  );
}

export function Youtube(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.8 4.6 2.7-4.6 2.7V9.8Z" fill="currentColor" />
    </svg>
  );
}

export function Whatsapp(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.04 2.5a9.4 9.4 0 0 0-8.1 14.11L2.5 21.5l4.99-1.39a9.4 9.4 0 1 0 4.55-17.6Zm0 1.72a7.68 7.68 0 1 1-3.9 14.3l-.28-.17-2.96.82.8-2.88-.18-.3a7.68 7.68 0 0 1 6.52-11.77Zm-3.2 3.6c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.68 4.16 3.66 1.98.78 2.38.63 2.81.59.43-.04 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28-.24-.12-1.4-.7-1.62-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.18-1.4-1.32-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.41h-.46Z" />
    </svg>
  );
}

/** Icones do ecossistema de solucoes, na circunferencia champanhe. */
export function ServiceGlyph({
  name,
  ...props
}: IconProps & { name: ServiceIcon }) {
  if (name === "strategy") {
    return (
      <svg {...base} {...props}>
        <path d="M4 19h16" />
        <path d="M4 19V9" />
        <path d="M4 14.5 9.5 10l3.5 3 6-6.5" />
        <path d="M15.5 6.5H19V10" />
      </svg>
    );
  }

  if (name === "growth") {
    return (
      <svg {...base} {...props}>
        <path d="M4.5 19V14" />
        <path d="M9.5 19V10.5" />
        <path d="M14.5 19V7" />
        <path d="M19.5 19V11.5" />
      </svg>
    );
  }

  if (name === "creative") {
    return (
      <svg {...base} {...props}>
        <rect x="2.8" y="7" width="12" height="10" rx="2.4" />
        <path d="M14.8 12.2 21 9v6l-6.2-3.2Z" />
      </svg>
    );
  }

  // technology
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2 19 7v5.4c0 3-2.7 5.6-7 8.4-4.3-2.8-7-5.4-7-8.4V7l7-3.8Z" />
      <path d="M9.4 11.6 12 13l2.6-1.4" />
      <path d="M12 13v3" />
    </svg>
  );
}
