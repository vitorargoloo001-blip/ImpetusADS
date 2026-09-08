import { SegmentCard } from "@/components/cards/SegmentCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { segments } from "@/data/segments";

export function SegmentsSection() {
  return (
    <section className="bg-bg pb-16 lg:pb-20">
      <SectionHeader
        eyebrow="Segmentos"
        title="Diferentes realidades. Especialistas em resultados."
        titleSize="compact"
        action={{ label: "Ver todos os segmentos", href: "/segmentos" }}
      />

      {/* Mobile / tablet */}
      <div className="mt-8 md:hidden">
        <ul className="snap-rail no-scrollbar">
          {segments.map((segment) => (
            <li key={segment.slug} className="w-[72vw] max-w-[20rem]">
              <SegmentCard segment={segment} />
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop */}
      <div className="container-site mt-9 hidden md:block lg:mt-10">
        <ul className="grid gap-3 md:grid-cols-3 xl:grid-cols-5 xl:gap-4">
          {segments.map((segment, index) => (
            <li key={segment.slug}>
              <Reveal delay={index * 70}>
                <SegmentCard segment={segment} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
