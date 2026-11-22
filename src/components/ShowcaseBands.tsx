import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { BACKDROPS, ExtendedProduct, PRODUCTS } from '../data/products';
import { ResilientImage } from './ResilientImage';
import { CrochetLaceDivider, FloralStitchCorner } from './CrochetDecor';

interface ShowcaseBandsProps {
  onQuickView: (product: ExtendedProduct) => void;
  onOpenBespoke: () => void;
}

interface BandConfig {
  id: string;
  align: 'left' | 'right';
  kicker: string;
  title: string;
  description: string;
  backdrop: string;
  cardBg: string;
  borderTint: string;
  primaryProduct: ExtendedProduct;
  secondaryProduct: ExtendedProduct;
  ctaLabel: string;
  isBespoke?: boolean;
}

function ParallaxShowcaseBand({
  band,
  onQuickView,
  onOpenBespoke,
}: {
  band: BandConfig;
  onQuickView: (product: ExtendedProduct) => void;
  onOpenBespoke: () => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div
      ref={sectionRef}
      className="relative flex min-h-[540px] items-center overflow-hidden py-14 lg:min-h-[600px] lg:py-20"
    >
      {/* Scroll-driven parallax pastel studio backdrop */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: bgY, scale: 1.08 }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <ResilientImage
          src={band.backdrop}
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Soft Pastel Daylight Scrim */}
      <div
        className={`absolute inset-0 z-0 ${
          band.align === 'left'
            ? 'bg-gradient-to-r from-[#FFFDF9]/82 via-[#FFFDF9]/42 to-[#FFFDF9]/25'
            : 'bg-gradient-to-l from-[#FFFDF9]/82 via-[#FFFDF9]/42 to-[#FFFDF9]/25'
        }`}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] px-6">
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  y: 36,
                  x: band.align === 'left' ? -24 : 24,
                  scale: 0.98,
                }
          }
          whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ backgroundColor: band.cardBg, borderColor: band.borderTint }}
          className={`relative w-full max-w-[600px] rounded-[28px] border-2 border-dashed p-5 shadow-[0_24px_65px_rgba(110,60,75,0.16)] backdrop-blur-md sm:p-6 ${
            band.align === 'right' ? 'ml-auto' : 'mr-auto'
          }`}
        >
          {/* Decorative Stitched Flower Corner */}
          <FloralStitchCorner className="absolute -top-2 -right-2 h-14 w-14 opacity-85" />

          {/* Dual Side-by-Side Pastel Product Photo Frames */}
          <div className="grid grid-cols-2 gap-3.5">
            <motion.button
              type="button"
              onClick={() => onQuickView(band.primaryProduct)}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="group relative aspect-[4/4.3] overflow-hidden rounded-2xl border border-black/8 bg-white p-1.5 text-left shadow-sm cursor-pointer"
            >
              <div className="h-full w-full overflow-hidden rounded-xl">
                <ResilientImage
                  src={band.primaryProduct.image}
                  alt={band.primaryProduct.imageAlt}
                  fallbackTitle={band.primaryProduct.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => onQuickView(band.secondaryProduct)}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="group relative aspect-[4/4.3] overflow-hidden rounded-2xl border border-black/8 bg-white p-1.5 text-left shadow-sm cursor-pointer"
            >
              <div className="h-full w-full overflow-hidden rounded-xl">
                <ResilientImage
                  src={band.secondaryProduct.image}
                  alt={band.secondaryProduct.imageAlt}
                  fallbackTitle={band.secondaryProduct.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.button>
          </div>

          {/* Card Copy + Action CTA */}
          <div className="mt-5">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#9D4463] uppercase">
              {band.kicker}
            </p>
            <h3 className="mt-1.5 font-display text-2xl font-semibold text-[#362426] sm:text-3xl">
              {band.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#644F52]">
              {band.description}
            </p>

            {/* Yarn Palette Preview Dots */}
            <div className="mt-3.5 flex items-center gap-2 text-xs text-[#715B5E]">
              <div className="flex items-center gap-1.5">
                {band.primaryProduct.swatches.map((s) => (
                  <span
                    key={s.name}
                    title={s.name}
                    className="h-3.5 w-3.5 rounded-full border border-black/15"
                    style={{ backgroundColor: s.hex }}
                  />
                ))}
              </div>
              <span aria-hidden="true">·</span>
              <span>Baby-Soft Natural Cotton</span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  band.isBespoke ? onOpenBespoke() : onQuickView(band.primaryProduct)
                }
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#9D4463] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#843651] active:scale-[0.98] cursor-pointer"
              >
                <span>{band.ctaLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onQuickView(band.secondaryProduct)}
                className="inline-flex min-h-[42px] items-center rounded-full border border-[#9D4463]/25 bg-white/90 px-4 py-2 text-xs font-semibold text-[#362426] transition-colors hover:bg-white cursor-pointer"
              >
                View {band.secondaryProduct.shortName}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ShowcaseBands({ onQuickView, onOpenBespoke }: ShowcaseBandsProps) {
  const bands: BandConfig[] = [
    {
      id: 'band-blush-ivory',
      align: 'left',
      kicker: 'BLUSH & CREAM NURSERY FROCKS',
      title: 'Blush Rose & Ivory Garden Sets',
      description:
        'Hand-crocheted pastel blush and shell-stitch ivory frocks paired with sculpted rose garlands, floral sun hats, and soft-soled Mary-Jane booties.',
      backdrop: BACKDROPS.nursery,
      cardBg: 'rgba(255, 246, 249, 0.94)',
      borderTint: 'rgba(157, 68, 99, 0.30)',
      primaryProduct: PRODUCTS[0],
      secondaryProduct: PRODUCTS[4],
      ctaLabel: 'Inspect in Studio',
    },
    {
      id: 'band-mulberry-cardigan',
      align: 'right',
      kicker: 'COZY KNITWEAR & MILESTONE DRESSES',
      title: 'Oatmeal Cardigan & Mulberry Rose',
      description:
        'Bullion-embroidered oatmeal cotton cardigans and heirloom long-sleeve lace dresses crafted for newborn portraits and family celebrations.',
      backdrop: BACKDROPS.yarnStudio,
      cardBg: 'rgba(254, 248, 240, 0.94)',
      borderTint: 'rgba(199, 145, 99, 0.35)',
      primaryProduct: PRODUCTS[5],
      secondaryProduct: PRODUCTS[1],
      ctaLabel: 'Inspect in Studio',
    },
    {
      id: 'band-azure-lavender',
      align: 'left',
      kicker: 'POWDER SKY & LAVENDER GARDEN',
      title: 'Azure Blossom & Lavender Meadow',
      description:
        'Breathable Peruvian Pima and combed cotton dresses accented with pearl-center daisies, violet rosebuds, and wide floral-halo sun hats.',
      backdrop: BACKDROPS.embroidery,
      cardBg: 'rgba(241, 248, 254, 0.94)',
      borderTint: 'rgba(92, 158, 201, 0.35)',
      primaryProduct: PRODUCTS[2],
      secondaryProduct: PRODUCTS[3],
      ctaLabel: 'Inspect in Studio',
    },
    {
      id: 'band-blanket-bonnet',
      align: 'right',
      kicker: 'NURSERY & WOODLAND KEEPSAKES',
      title: 'Daisy Blankets & Sage Pixie Bonnets',
      description:
        'Raised puff-stitch daisy heirloom blankets alongside hand-embroidered sage pixie bonnets and wooden-button Mary-Jane booties.',
      backdrop: BACKDROPS.nursery,
      cardBg: 'rgba(240, 248, 241, 0.94)',
      borderTint: 'rgba(110, 153, 116, 0.35)',
      primaryProduct: PRODUCTS[6],
      secondaryProduct: PRODUCTS[7],
      ctaLabel: 'Inspect in Studio',
    },
    {
      id: 'band-monogram-hoop',
      align: 'left',
      kicker: 'BESPOKE NAME EMBROIDERY',
      title: 'Personalized Monogram Hoops & Bibs',
      description:
        'Commission custom baby initial linen nursery hoops and scalloped crochet bibs embroidered with hand-stitched pastel roses in your nursery palette.',
      backdrop: BACKDROPS.embroidery,
      cardBg: 'rgba(247, 243, 253, 0.94)',
      borderTint: 'rgba(142, 110, 194, 0.35)',
      primaryProduct: PRODUCTS[8],
      secondaryProduct: PRODUCTS[0],
      ctaLabel: 'Customize in Studio',
      isBespoke: true,
    },
  ];

  return (
    <section id="collection-showcase" className="relative bg-[#FFFDF9]">
      <CrochetLaceDivider fillTop="#FCECF0" fillBottom="#FFFDF9" />

      {/* Bright Editorial Header Bar */}
      <div className="border-b border-[#9D4463]/12 bg-[#FFFDF9] px-6 py-8">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#9D4463] uppercase">
              01 · Cozy Crochet &amp; Embroidery Collection
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-semibold text-[#362426] sm:text-3xl">
              Pastel baby couture, knitwear &amp; hand-stitched keepsakes
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenBespoke}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#9D4463]/25 bg-[#FCECF0] px-4 py-2 text-xs font-semibold text-[#9D4463] transition-colors hover:bg-[#F7DCE3] cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Custom Nursery Color Studio</span>
          </button>
        </div>
      </div>

      {/* Alternating Scroll-Parallax Pastel Showcase Bands */}
      <div className="divide-y divide-[#9D4463]/12">
        {bands.map((band) => (
          <ParallaxShowcaseBand
            key={band.id}
            band={band}
            onQuickView={onQuickView}
            onOpenBespoke={onOpenBespoke}
          />
        ))}
      </div>
    </section>
  );
}
