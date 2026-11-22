import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { BACKDROPS, TESTIMONIALS } from '../data/products';
import { ResilientImage } from './ResilientImage';
import { CrochetLaceDivider, FloralStitchCorner } from './CrochetDecor';

interface SupplyTestimonialsSectionProps {
  onOpenInquiry: () => void;
}

export function SupplyTestimonialsSection({
  onOpenInquiry,
}: SupplyTestimonialsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const servicePillars = [
    {
      label: 'Single Keepsakes',
      title: 'Made-to-Order Baby Sizing',
      desc: 'Custom newborn to 18M sizing, matching sun hats, and embroidered baby name tags within 7–10 days.',
      bg: '#FCECF0',
    },
    {
      label: 'Gifts & Ceremonies',
      title: 'Heirloom Gift Boxing',
      desc: 'Wrapped in acid-free cedar tissue inside keepsake linen boxes, ready for baby showers and naming days.',
      bg: '#EAF4FB',
    },
    {
      label: 'Boutique Supply',
      title: 'Curated Studio Batches',
      desc: 'Nursery boutiques can commission coordinated pastel colorways with custom sewn care tags.',
      bg: '#EDF5EE',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FFFDF9]">
      <CrochetLaceDivider fillTop="#FDF6EC" fillBottom="#EAF4FB" />

      <div ref={sectionRef} className="relative overflow-hidden py-16 lg:py-24">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: bgY, scale: 1.1 }}
          className="pointer-events-none absolute inset-0"
        >
          <ResilientImage
            src={BACKDROPS.nursery}
            alt=""
            className="h-full w-full object-cover opacity-55"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#EAF4FB]/80 via-[#FFFDF9]/65 to-[#FCECF0]/80" />

        <div className="relative z-10 mx-auto max-w-[1160px] px-6">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[28px] border-2 border-dashed border-[#9D4463]/28 bg-[#FFFDF9]/94 p-6 shadow-[0_24px_65px_rgba(115,65,80,0.15)] backdrop-blur-md sm:p-10"
          >
            <FloralStitchCorner className="absolute -top-2 -right-2 h-14 w-14 opacity-85" />

            <p className="text-xs font-semibold tracking-[0.14em] text-[#9D4463] uppercase">
              03 · Family Keepsakes &amp; Boutique Orders
            </p>
            <h2
              className="mt-2 max-w-[26ch] font-display text-3xl font-semibold leading-tight text-[#362426] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Handcrafted with love for milestones, showers &amp; baby boutiques
            </h2>

            {/* 3 Pastel Supply Capability Columns */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {servicePillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ backgroundColor: pillar.bg }}
                  className="rounded-2xl border border-dashed border-[#9D4463]/25 p-5"
                >
                  <p className="text-[11px] font-semibold text-[#9D4463] uppercase">
                    {pillar.label}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-[#362426]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#644F52]">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Verified Family Quotes */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {TESTIMONIALS.map((item, i) => (
                <motion.blockquote
                  key={item.author}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  style={{ backgroundColor: item.pastelBg }}
                  className="flex flex-col justify-between rounded-2xl border border-[#9D4463]/15 p-5"
                >
                  <p className="text-sm leading-relaxed text-[#362426]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="mt-4 border-t border-[#9D4463]/15 pt-3">
                    <p className="text-xs font-semibold text-[#362426]">{item.author}</p>
                    <p className="text-[11px] text-[#715B5E]">{item.detail}</p>
                  </footer>
                </motion.blockquote>
              ))}
            </div>

            {/* Bottom Action Bar */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#9D4463]/15 pt-6">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5A4246]">
                <Check className="h-4 w-4 text-[#3C6E47]" aria-hidden="true" />
                <span>7–10 Day Custom Turnaround · All Baby Sizes &amp; Pastel Colors Supported</span>
              </div>

              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#9D4463] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#843651] active:scale-[0.98] cursor-pointer"
              >
                <span>Open Inquiry Bag</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
