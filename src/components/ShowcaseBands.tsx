import { useRef, useState, useMemo, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useInView,
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

interface ChapterItem {
  id: string;
  chapterNumber: string;
  kicker: string;
  title: string;
  description: string;
  cardBg: string;
  borderTint: string;
  product: ExtendedProduct;
  ctaLabel: string;
  isBespoke?: boolean;
  isSyncedStudioChapter?: boolean;
}

const CHAPTER_COPY: Record<
  string,
  { kicker: string; title: string; cardBg: string; borderTint: string; ctaLabel: string; isBespoke?: boolean }
> = {
  'cce-blush-rose-garden': {
    kicker: 'PASTEL BLUSH & IVORY COUTURE',
    title: 'Blush Rose Garden 3-Piece',
    cardBg: 'rgba(255, 246, 249, 0.94)',
    borderTint: 'rgba(217, 123, 147, 0.35)',
    ctaLabel: 'Inspect in Studio',
  },
  'cce-mulberry-heirloom': {
    kicker: 'MILESTONE LACE & BERET SET',
    title: 'Mulberry Rose Heirloom 3-Piece',
    cardBg: 'rgba(252, 241, 245, 0.94)',
    borderTint: 'rgba(157, 68, 99, 0.35)',
    ctaLabel: 'Inspect in Studio',
  },
  'cce-azure-blossom': {
    kicker: 'POWDER SKY & OCEAN TEAL',
    title: 'Azure Blossom Summer 3-Piece',
    cardBg: 'rgba(241, 248, 254, 0.94)',
    borderTint: 'rgba(92, 158, 201, 0.35)',
    ctaLabel: 'Inspect in Studio',
  },
  'cce-lavender-meadow': {
    kicker: 'SNOW-WHITE & VIOLET ROSEBUDS',
    title: 'Lavender Meadow Garden Set',
    cardBg: 'rgba(246, 242, 253, 0.94)',
    borderTint: 'rgba(142, 110, 194, 0.35)',
    ctaLabel: 'Inspect in Studio',
  },
  'cce-ivory-shell-rosebud': {
    kicker: 'CEREMONY SHELL LACE',
    title: 'Ivory Shell & Rosebud 3-Piece',
    cardBg: 'rgba(254, 248, 236, 0.94)',
    borderTint: 'rgba(217, 140, 163, 0.35)',
    ctaLabel: 'Inspect in Studio',
  },
  'cce-oatmeal-rose-cardigan': {
    kicker: 'HAND-EMBROIDERED KNITWEAR',
    title: 'Oatmeal Rose Embroidered Cardigan',
    cardBg: 'rgba(254, 248, 240, 0.94)',
    borderTint: 'rgba(199, 145, 99, 0.35)',
    ctaLabel: 'Inspect in Studio',
  },
  'cce-daisy-heirloom-blanket': {
    kicker: 'HEIRLOOM NURSERY KEEPSAKE',
    title: 'Ivory Daisy Heirloom Blanket',
    cardBg: 'rgba(254, 249, 238, 0.94)',
    borderTint: 'rgba(199, 155, 104, 0.35)',
    ctaLabel: 'Inspect in Studio',
  },
  'cce-sage-pixie-bonnet-set': {
    kicker: 'WOODLAND BOTANICAL KNIT',
    title: 'Sage Blossom Pixie Bonnet & Booties',
    cardBg: 'rgba(240, 248, 241, 0.94)',
    borderTint: 'rgba(110, 153, 116, 0.35)',
    ctaLabel: 'Inspect in Studio',
  },
  'cce-monogram-hoop-bib-set': {
    kicker: 'BESPOKE NAME EMBROIDERY',
    title: 'Floral Monogram Hoop & Crochet Bib',
    cardBg: 'rgba(255, 246, 249, 0.94)',
    borderTint: 'rgba(157, 68, 99, 0.32)',
    ctaLabel: 'Customize in Studio',
    isBespoke: true,
  },
};

function ScrollStoryChapter({
  chapter,
  index,
  totalChapters,
  onActivate,
  onSelectProductId,
  onQuickView,
  onOpenBespoke,
}: {
  chapter: ChapterItem;
  index: number;
  totalChapters: number;
  onActivate: (idx: number) => void;
  onSelectProductId: (productId: string) => void;
  onQuickView: (product: ExtendedProduct) => void;
  onOpenBespoke: () => void;
}) {
  const chapterRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isInCenter = useInView(chapterRef, {
    margin: '-40% 0px -40% 0px',
  });

  useEffect(() => {
    if (isInCenter) {
      onActivate(index);
    }
  }, [isInCenter, index, onActivate]);

  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ['start end', 'end start'],
  });

  const cardY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [68, 0, 0, -56]);
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.92]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.2, 1, 1, 0.25]
  );

  // Subtle counter-parallax between the flat-lay outfit and the baby wearing it
  const flatPhotoY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const wornPhotoY = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const wornPhotoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.04, 0.98]);

  const cardSide = chapter.product.babySide === 'left' ? 'right' : 'left';

  const currentIdx = PRODUCTS.findIndex((p) => p.id === chapter.product.id);
  const safeIdx = currentIdx >= 0 ? currentIdx : 0;

  const handleStep = (delta: number) => {
    const nextIdx = (safeIdx + delta + PRODUCTS.length) % PRODUCTS.length;
    onSelectProductId(PRODUCTS[nextIdx].id);
  };

  return (
    <div
      ref={chapterRef}
      id={`look-chapter-${index}`}
      className="relative flex min-h-[82vh] items-center py-14 lg:min-h-[88vh] lg:py-20"
    >
      <div className="mx-auto flex w-full max-w-[1320px] px-6">
        <motion.div
          style={
            prefersReducedMotion
              ? {
                  backgroundColor: chapter.cardBg,
                  borderColor: chapter.borderTint,
                }
              : {
                  y: cardY,
                  scale: cardScale,
                  opacity: cardOpacity,
                  backgroundColor: chapter.cardBg,
                  borderColor: chapter.borderTint,
                }
          }
          className={`relative w-full max-w-[590px] rounded-[28px] border-2 border-dashed p-5 shadow-[0_28px_75px_rgba(110,60,75,0.2)] backdrop-blur-md sm:p-6 ${
            cardSide === 'right' ? 'ml-auto' : 'mr-auto'
          }`}
        >
          <FloralStitchCorner className="pointer-events-none absolute -top-2 -right-2 h-14 w-14 opacity-85" />

          {/* Chapter Top Row */}
          <div className="mb-3.5 flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold tracking-[0.15em] text-[#9D4463] uppercase tabular-nums">
              {chapter.isSyncedStudioChapter
                ? `Active Studio Look · ${safeIdx + 1} / ${PRODUCTS.length}`
                : `${chapter.chapterNumber} / 0${totalChapters} · ${chapter.kicker}`}
            </p>

            {chapter.isSyncedStudioChapter && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStep(-1)}
                  aria-label="Previous dress look"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#9D4463]/20 bg-white text-[#362426] transition-colors hover:bg-[#FCECF0] cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStep(1)}
                  aria-label="Next dress look"
                  className="inline-flex h-8 items-center gap-1 rounded-full border border-[#9D4463]/20 bg-white px-3 text-[11px] font-semibold text-[#362426] transition-colors hover:bg-[#FCECF0] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Next Dress</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Dual Side-by-Side Frames with Scroll-Linked Depth */}
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.product.id}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 gap-3.5">
                <motion.button
                  type="button"
                  onClick={() => onQuickView(chapter.product)}
                  whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white p-1.5 text-left shadow-sm cursor-pointer"
                >
                  <div className="aspect-[4/4.3] w-full overflow-hidden rounded-xl">
                    <motion.div
                      style={prefersReducedMotion ? undefined : { y: flatPhotoY }}
                      className="h-[112%] w-full -mt-[6%]"
                    >
                      <ResilientImage
                        src={chapter.product.image}
                        alt={chapter.product.imageAlt}
                        fallbackTitle={chapter.product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                  </div>
                  <span className="px-2 pt-2 pb-1 text-[11px] font-semibold text-[#715B5E]">
                    Outfit Flat-Lay
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => onQuickView(chapter.product)}
                  whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#9D4463]/25 bg-white p-1.5 text-left shadow-sm cursor-pointer"
                >
                  <div className="aspect-[4/4.3] w-full overflow-hidden rounded-xl">
                    <motion.div
                      style={
                        prefersReducedMotion
                          ? undefined
                          : { y: wornPhotoY, scale: wornPhotoScale }
                      }
                      className="h-[112%] w-full -mt-[6%]"
                    >
                      <ResilientImage
                        src={chapter.product.wornImage}
                        alt={chapter.product.wornImageAlt}
                        fallbackTitle={chapter.product.name}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                  </div>
                  <span className="px-2 pt-2 pb-1 text-[11px] font-semibold text-[#9D4463]">
                    Same Dress on Baby
                  </span>
                </motion.button>
              </div>

              <div className="mt-5">
                <h3 className="font-display text-2xl font-semibold text-[#362426] sm:text-3xl">
                  {chapter.product.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#644F52]">
                  {chapter.description}
                </p>

                <div className="mt-3.5 flex items-center gap-2 text-xs text-[#715B5E]">
                  <div className="flex items-center gap-1.5">
                    {chapter.product.swatches.map((s) => (
                      <span
                        key={s.name}
                        title={s.name}
                        className="h-3.5 w-3.5 rounded-full border border-black/15"
                        style={{ backgroundColor: s.hex }}
                      />
                    ))}
                  </div>
                  <span aria-hidden="true">·</span>
                  <span>{chapter.product.yarnComposition}</span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      chapter.isBespoke
                        ? onOpenBespoke()
                        : onQuickView(chapter.product)
                    }
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#9D4463] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-[#843651] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{chapter.ctaLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>

                  <a
                    href="#studio"
                    onClick={() => onSelectProductId(chapter.product.id)}
                    className="inline-flex min-h-[42px] items-center rounded-full border border-[#9D4463]/25 bg-white/92 px-4 py-2 text-xs font-semibold text-[#362426] transition-colors hover:bg-white whitespace-nowrap shrink-0"
                  >
                    Select in 3D Studio
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

export function ShowcaseBands({
  activeProduct,
  onSelectProductId,
  onQuickView,
  onOpenBespoke,
}: ShowcaseBandsProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  // Build ordered chapters starting with activeProduct, followed by key alternating collection pieces
  const chapters = useMemo<ChapterItem[]>(() => {
    const featuredIds = [
      'cce-blush-rose-garden',
      'cce-mulberry-heirloom',
      'cce-azure-blossom',
      'cce-lavender-meadow',
      'cce-ivory-shell-rosebud',
      'cce-oatmeal-rose-cardigan',
      'cce-sage-pixie-bonnet-set',
      'cce-monogram-hoop-bib-set',
    ];

    const remaining = featuredIds
      .filter((id) => id !== activeProduct.id)
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter((p): p is ExtendedProduct => Boolean(p))
      .slice(0, 6);

    const sequence = [activeProduct, ...remaining];

    return sequence.map((prod, idx) => {
      const meta = CHAPTER_COPY[prod.id] ?? {
        kicker: prod.categoryLabel.toUpperCase(),
        title: prod.name,
        cardBg: 'rgba(255, 250, 246, 0.94)',
        borderTint: 'rgba(157, 68, 99, 0.32)',
        ctaLabel: 'Inspect in Studio',
      };

      return {
        id: idx === 0 ? 'synced-active-chapter' : `chapter-${prod.id}`,
        chapterNumber: `0${idx + 1}`,
        kicker: meta.kicker,
        title: meta.title,
        description: prod.description,
        cardBg: meta.cardBg,
        borderTint: meta.borderTint,
        product: prod,
        ctaLabel: meta.ctaLabel,
        isBespoke: meta.isBespoke,
        isSyncedStudioChapter: idx === 0,
      };
    });
  }, [activeProduct]);

  const safeChapterIdx = Math.min(activeChapterIdx, chapters.length - 1);
  const currentStageProduct = chapters[safeChapterIdx]?.product ?? activeProduct;

  const { scrollYProgress: stageProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  const stickyBgScale = useTransform(stageProgress, [0, 1], [1.01, 1.09]);

  const scrollToChapter = (idx: number) => {
    const el = document.getElementById(`look-chapter-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="collection-showcase" className="relative bg-[#FFFDF9]">
      <CrochetLaceDivider fillTop="#FCECF0" fillBottom="#FFFDF9" />

      {/* Bright Editorial Header Bar */}
      <div className="border-b border-[#9D4463]/12 bg-[#FFFDF9] px-6 py-8">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-[#9D4463] uppercase">
              01 · Scroll-Animated Lookbook &amp; Baby Showcase
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-semibold text-[#362426] sm:text-3xl">
              Scroll through each handcrafted outfit — watch the baby look transform live
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

      {/* Sticky Scrollytelling Stage: Background Baby Changes Smoothly as You Scroll */}
      <div ref={stageRef} id="live-baby-preview" className="relative">
        {/* Sticky Full-Viewport Backdrop Layer (NO overflow-hidden on ancestors!) */}
        <div className="sticky top-[68px] z-0 h-[calc(100vh-68px)] w-full overflow-hidden bg-[#FCECF0]">
          <motion.div
            style={prefersReducedMotion ? undefined : { scale: stickyBgScale }}
            className="relative h-full w-full"
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={currentStageProduct.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 1.06 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <ResilientImage
                  src={currentStageProduct.backdropImage}
                  alt=""
                  className={`h-full w-full object-cover ${
                    currentStageProduct.backdropPosition ?? 'object-center'
                  }`}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Directional Scrim: keeps opposite-side baby razor-sharp */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
              currentStageProduct.babySide === 'left'
                ? 'bg-gradient-to-l from-[#FFFDF9]/82 via-[#FFFDF9]/28 to-transparent'
                : 'bg-gradient-to-r from-[#FFFDF9]/82 via-[#FFFDF9]/28 to-transparent'
            }`}
          />

          {/* Subtle Bottom Chapter Stepper Pill */}
          <div className="pointer-events-none absolute right-0 bottom-4 left-0 z-20 hidden justify-center px-4 md:flex">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-[#9D4463]/20 bg-[#FFFDF9]/92 px-3 py-1.5 shadow-md backdrop-blur-md">
              {chapters.map((ch, idx) => {
                const isActive = idx === safeChapterIdx;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => scrollToChapter(idx)}
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#9D4463] text-white shadow-xs'
                        : 'text-[#6A5558] hover:text-[#362426]'
                    }`}
                  >
                    {ch.chapterNumber} · {ch.product.shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrolling Story Chapters gliding over the sticky changing backdrop */}
        <div className="relative z-10 -mt-[calc(100vh-68px)] pb-12">
          {chapters.map((chapter, idx) => (
            <ScrollStoryChapter
              key={chapter.id}
              chapter={chapter}
              index={idx}
              totalChapters={chapters.length}
              onActivate={setActiveChapterIdx}
              onSelectProductId={onSelectProductId}
              onQuickView={onQuickView}
              onOpenBespoke={onOpenBespoke}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
