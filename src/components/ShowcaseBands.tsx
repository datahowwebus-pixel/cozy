import { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { ExtendedProduct, PRODUCTS } from '../data/products';
import { ResilientImage } from './ResilientImage';
import { CrochetLaceDivider, FloralStitchCorner } from './CrochetDecor';

interface ShowcaseBandsProps {
  activeProduct: ExtendedProduct;
  onSelectProductId: (productId: string) => void;
  onQuickView: (product: ExtendedProduct) => void;
  onOpenBespoke: () => void;
}

interface BandConfig {
  id: string;
  align: 'left' | 'right';
  kicker: string;
  title: string;
  description: string;
  cardBg: string;
  borderTint: string;
  product: ExtendedProduct;
  ctaLabel: string;
  isBespoke?: boolean;
}

function SyncedLookbookBand({
  activeProduct,
  onSelectProductId,
  onQuickView,
}: {
  activeProduct: ExtendedProduct;
  onSelectProductId: (productId: string) => void;
  onQuickView: (product: ExtendedProduct) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const currentIdx = PRODUCTS.findIndex((p) => p.id === activeProduct.id);
  const safeIdx = currentIdx >= 0 ? currentIdx : 0;

  const handlePrev = () => {
    const prevIdx = (safeIdx - 1 + PRODUCTS.length) % PRODUCTS.length;
    onSelectProductId(PRODUCTS[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (safeIdx + 1) % PRODUCTS.length;
    onSelectProductId(PRODUCTS[nextIdx].id);
  };

  return (
    <div
      ref={sectionRef}
      id="live-baby-preview"
      className="relative flex min-h-[560px] items-center overflow-hidden py-14 lg:min-h-[630px] lg:py-20"
    >
      {/* Full-Bleed Scroll-Parallax Backdrop of Baby Wearing the Active Selected Dress */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: bgY, scale: 1.08 }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-full w-full"
          >
            <ResilientImage
              src={activeProduct.backdropImage}
              alt=""
              className={`h-full w-full object-cover ${activeProduct.backdropPosition ?? 'object-center'}`}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Directional Scrim: keeps opposite-side background baby 100% clear */}
      <div
        className={`absolute inset-0 z-0 ${
          activeProduct.babySide === 'left'
            ? 'bg-gradient-to-l from-[#FFFDF9]/78 via-[#FFFDF9]/25 to-transparent'
            : 'bg-gradient-to-r from-[#FFFDF9]/78 via-[#FFFDF9]/25 to-transparent'
        }`}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] px-6">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundColor: 'rgba(255, 250, 246, 0.94)',
            borderColor: 'rgba(157, 68, 99, 0.32)',
          }}
          className={`relative w-full max-w-[600px] rounded-[28px] border-2 border-dashed p-5 shadow-[0_24px_65px_rgba(110,60,75,0.18)] backdrop-blur-md sm:p-6 ${
            activeProduct.babySide === 'left' ? 'ml-auto' : 'mr-auto'
          }`}
        >
          <FloralStitchCorner className="pointer-events-none absolute -top-2 -right-2 h-14 w-14 opacity-85" />

          {/* Header Bar with Live Prev / Next Dress Sync Switcher */}
          <div className="mb-3.5 flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold tracking-[0.15em] text-[#9D4463] uppercase">
              Active Studio Look · {safeIdx + 1} / {PRODUCTS.length}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous dress look"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#9D4463]/20 bg-white text-[#362426] transition-colors hover:bg-[#FCECF0] cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next dress look"
                className="inline-flex h-8 items-center gap-1 rounded-full border border-[#9D4463]/20 bg-white px-3 text-[11px] font-semibold text-[#362426] transition-colors hover:bg-[#FCECF0] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Next Dress</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Dual Side-by-Side Synced Cards: Left = Cloth Flat-Lay, Right = Baby Wearing Same Dress */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => onQuickView(activeProduct)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white p-1.5 text-left shadow-sm cursor-pointer"
                >
                  <div className="aspect-[4/4.3] w-full overflow-hidden rounded-xl">
                    <ResilientImage
                      src={activeProduct.image}
                      alt={activeProduct.imageAlt}
                      fallbackTitle={activeProduct.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="px-2 pt-2 pb-1 text-[11px] font-semibold text-[#715B5E]">
                    Selected Outfit Flat-Lay
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onQuickView(activeProduct)}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#9D4463]/25 bg-white p-1.5 text-left shadow-sm cursor-pointer"
                >
                  <div className="aspect-[4/4.3] w-full overflow-hidden rounded-xl">
                    <ResilientImage
                      src={activeProduct.wornImage}
                      alt={activeProduct.wornImageAlt}
                      fallbackTitle={activeProduct.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="px-2 pt-2 pb-1 text-[11px] font-semibold text-[#9D4463]">
                    Same Dress Worn by Baby
                  </span>
                </button>
              </div>

              <div className="mt-5">
                <h3 className="font-display text-2xl font-semibold text-[#362426] sm:text-3xl">
                  {activeProduct.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#644F52]">
                  {activeProduct.description}
                </p>

                <div className="mt-3.5 flex items-center gap-2 text-xs text-[#715B5E]">
                  <div className="flex items-center gap-1.5">
                    {activeProduct.swatches.map((s) => (
                      <span
                        key={s.name}
                        title={s.name}
                        className="h-3.5 w-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: s.hex }}
                      />
                    ))}
                  </div>
                  <span aria-hidden="true">·</span>
                  <span>{activeProduct.yarnComposition}</span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onQuickView(activeProduct)}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#9D4463] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#843651] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Inspect in Studio</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>

                  <a
                    href="#studio"
                    className="inline-flex min-h-[42px] items-center rounded-full border border-[#9D4463]/25 bg-white/92 px-4 py-2 text-xs font-semibold text-[#362426] transition-colors hover:bg-white whitespace-nowrap shrink-0"
                  >
                    Switch Dress Above
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function ParallaxShowcaseBand({
  band,
  onSelectProductId,
  onQuickView,
  onOpenBespoke,
}: {
  band: BandConfig;
  onSelectProductId: (productId: string) => void;
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
      {/* Scroll-driven parallax backdrop showing baby wearing this band's outfit */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: bgY, scale: 1.08 }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <ResilientImage
          src={band.product.backdropImage}
          alt=""
          className={`h-full w-full object-cover ${band.product.backdropPosition ?? 'object-center'}`}
        />
      </motion.div>

      {/* Directional Daylight Scrim so opposite-side baby stays crystal clear */}
      <div
        className={`absolute inset-0 z-0 ${
          band.align === 'left'
            ? 'bg-gradient-to-r from-[#FFFDF9]/78 via-[#FFFDF9]/24 to-transparent'
            : 'bg-gradient-to-l from-[#FFFDF9]/78 via-[#FFFDF9]/24 to-transparent'
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
          <FloralStitchCorner className="pointer-events-none absolute -top-2 -right-2 h-14 w-14 opacity-85" />

          {/* Dual Side-by-Side Frames: Left = Flat-Lay Outfit, Right = Baby Wearing It */}
          <div className="grid grid-cols-2 gap-3.5">
            <motion.button
              type="button"
              onClick={() => onQuickView(band.product)}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="group relative aspect-[4/4.3] overflow-hidden rounded-2xl border border-black/8 bg-white p-1.5 text-left shadow-sm cursor-pointer"
            >
              <div className="h-full w-full overflow-hidden rounded-xl">
                <ResilientImage
                  src={band.product.image}
                  alt={band.product.imageAlt}
                  fallbackTitle={band.product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => onQuickView(band.product)}
              whileHover={prefersReducedMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.2 }}
              className="group relative aspect-[4/4.3] overflow-hidden rounded-2xl border border-black/8 bg-white p-1.5 text-left shadow-sm cursor-pointer"
            >
              <div className="h-full w-full overflow-hidden rounded-xl">
                <ResilientImage
                  src={band.product.wornImage}
                  alt={band.product.wornImageAlt}
                  fallbackTitle={band.product.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
                {band.product.swatches.map((s) => (
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
                  band.isBespoke ? onOpenBespoke() : onQuickView(band.product)
                }
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#9D4463] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#843651] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{band.ctaLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <a
                href="#studio"
                onClick={() => onSelectProductId(band.product.id)}
                className="inline-flex min-h-[42px] items-center rounded-full border border-[#9D4463]/25 bg-white/90 px-4 py-2 text-xs font-semibold text-[#362426] transition-colors hover:bg-white whitespace-nowrap shrink-0"
              >
                Select in 3D Studio
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ShowcaseBands({
  activeProduct,
  onSelectProductId,
  onQuickView,
  onOpenBespoke,
}: ShowcaseBandsProps) {
  const bands: BandConfig[] = [
    {
      id: 'band-mulberry-heirloom',
      align: PRODUCTS[1].babySide === 'left' ? 'right' : 'left',
      kicker: 'MILESTONE LACE & BERET SET',
      title: 'Mulberry Rose Heirloom 3-Piece',
      description:
        'Long-sleeve shell-lattice mulberry dress adorned with three dimensional coral-pink roses, pearl-center crochet beret, and matching floral booties.',
      cardBg: 'rgba(252, 241, 245, 0.94)',
      borderTint: 'rgba(157, 68, 99, 0.32)',
      product: PRODUCTS[1],
      ctaLabel: 'Inspect in Studio',
    },
    {
      id: 'band-azure-blossom',
      align: PRODUCTS[2].babySide === 'left' ? 'right' : 'left',
      kicker: 'POWDER SKY & OCEAN TEAL',
      title: 'Azure Blossom Summer 3-Piece',
      description:
        'Breathable Peruvian Pima cotton dress with braided vertical pleats, pearl-centered daisies, ruffled white hem, and a wide daisy-halo sun hat.',
      cardBg: 'rgba(241, 248, 254, 0.94)',
      borderTint: 'rgba(92, 158, 201, 0.35)',
      product: PRODUCTS[2],
      ctaLabel: 'Inspect in Studio',
    },
    {
      id: 'band-lavender-meadow',
      align: PRODUCTS[3].babySide === 'left' ? 'right' : 'left',
      kicker: 'SNOW-WHITE & VIOLET ROSEBUDS',
      title: 'Lavender Meadow Garden Set',
      description:
        'Crisp combed-cotton white dress framed with violet rosebuds, emerald leaf embroidery, picot lavender edging, and matching floral sun hat.',
      cardBg: 'rgba(246, 242, 253, 0.94)',
      borderTint: 'rgba(142, 110, 194, 0.35)',
      product: PRODUCTS[3],
      ctaLabel: 'Inspect in Studio',
    },
    {
      id: 'band-ivory-shell',
      align: PRODUCTS[4].babySide === 'left' ? 'right' : 'left',
      kicker: 'CEREMONY SHELL LACE',
      title: 'Ivory Shell & Rosebud 3-Piece',
      description:
        'Airy shell-stitch ivory lace frock with a blush rose and sage leaf garland, paired with a gentle floral headband and rose-appliqué booties.',
      cardBg: 'rgba(254, 248, 236, 0.94)',
      borderTint: 'rgba(217, 140, 163, 0.35)',
      product: PRODUCTS[4],
      ctaLabel: 'Inspect in Studio',
    },
    {
      id: 'band-oatmeal-cardigan',
      align: PRODUCTS[5].babySide === 'left' ? 'right' : 'left',
      kicker: 'HAND-EMBROIDERED KNITWEAR',
      title: 'Oatmeal Rose Embroidered Cardigan',
      description:
        'Bullion-stitch dusty rosebuds and sage leaves hand-embroidered across the neckline yoke and twin pockets of our warm oatmeal cotton cardigan.',
      cardBg: 'rgba(254, 248, 240, 0.94)',
      borderTint: 'rgba(199, 145, 99, 0.35)',
      product: PRODUCTS[5],
      ctaLabel: 'Inspect in Studio',
    },
    {
      id: 'band-monogram-hoop',
      align: PRODUCTS[8].babySide === 'left' ? 'right' : 'left',
      kicker: 'BESPOKE NAME EMBROIDERY',
      title: 'Floral Monogram Hoop & Crochet Bib',
      description:
        'Commission custom baby initial linen nursery hoops paired with scalloped crochet bibs embroidered with pastel roses in your nursery palette.',
      cardBg: 'rgba(255, 246, 249, 0.94)',
      borderTint: 'rgba(157, 68, 99, 0.30)',
      product: PRODUCTS[8],
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
              01 · Matched Outfit &amp; Baby Lookbook Showcase
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-semibold text-[#362426] sm:text-3xl">
              Select any dress above to see the baby wearing the exact piece below
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenBespoke}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#9D4463]/25 bg-[#FCECF0] px-4 py-2 text-xs font-semibold text-[#9D4463] transition-colors hover:bg-[#F7DCE3] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Custom Nursery Color Studio</span>
          </button>
        </div>
      </div>

      {/* Band 00: Live Synced Lookbook Matching Whatever Cloth Is Selected Above */}
      <div className="divide-y divide-[#9D4463]/12">
        <SyncedLookbookBand
          activeProduct={activeProduct}
          onSelectProductId={onSelectProductId}
          onQuickView={onQuickView}
        />

        {/* Bands 01-05: Scroll-Parallax Collection Pairing Cards */}
        {bands.map((band) => (
          <ParallaxShowcaseBand
            key={band.id}
            band={band}
            onSelectProductId={onSelectProductId}
            onQuickView={onQuickView}
            onOpenBespoke={onOpenBespoke}
          />
        ))}
      </div>
    </section>
  );
}
