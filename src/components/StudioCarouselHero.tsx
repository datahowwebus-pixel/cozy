import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, Plus, Check, Maximize2 } from 'lucide-react';
import { ExtendedProduct, PRODUCTS } from '../data/products';
import { BabySize, ProductCategory } from '../types';
import { ResilientImage } from './ResilientImage';
import { FloralStitchCorner } from './CrochetDecor';

interface StudioCarouselHeroProps {
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: ExtendedProduct) => void;
  onAddToInquiry: (product: ExtendedProduct, size: BabySize) => void;
  onActiveProductChange?: (product: ExtendedProduct, size: BabySize) => void;
}

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Collection' },
  { id: 'dress-sets', label: '3-Piece Dresses' },
  { id: 'knitwear-blankets', label: 'Knitwear & Blankets' },
  { id: 'bonnets-embroidery', label: 'Bonnets & Embroidery' },
];

export function StudioCarouselHero({
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToInquiry,
  onActiveProductChange,
}: StudioCarouselHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<BabySize>('3–6M');
  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const safeIndex = activeIndex % visibleProducts.length;
  const activeProduct = visibleProducts[safeIndex] ?? PRODUCTS[0];

  useEffect(() => {
    setSelectedSwatchIndex(0);
    setSelectedSize(activeProduct.sizes.includes('3–6M') ? '3–6M' : activeProduct.sizes[0]);
  }, [activeProduct]);

  useEffect(() => {
    onActiveProductChange?.(activeProduct, selectedSize);
  }, [activeProduct, selectedSize, onActiveProductChange]);

  const handleCategoryChange = (cat: ProductCategory) => {
    setActiveCategory(cat);
    setActiveIndex(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + visibleProducts.length) % visibleProducts.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % visibleProducts.length);
  };

  const cycleSize = () => {
    const idx = activeProduct.sizes.indexOf(selectedSize);
    const nextSize = activeProduct.sizes[(idx + 1) % activeProduct.sizes.length];
    setSelectedSize(nextSize);
  };

  const handleAdd = () => {
    onAddToInquiry(activeProduct, selectedSize);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  const coverflowSlots = useMemo(() => {
    const len = visibleProducts.length;
    const offsets = len >= 5 ? [-2, -1, 0, 1, 2] : [-1, 0, 1];
    return offsets.map((offset) => {
      const idx = (safeIndex + offset + len * 3) % len;
      return {
        offset,
        idx,
        product: visibleProducts[idx],
      };
    });
  }, [visibleProducts, safeIndex]);

  return (
    <section
      id="studio"
      className="relative flex min-h-[calc(100vh-68px)] flex-col justify-between overflow-hidden bg-[#FCECF0] py-6 sm:py-8"
    >
      {/* Bright Sunlit Pastel Studio Backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.backdropImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 z-0"
        >
          <ResilientImage
            src={activeProduct.backdropImage}
            alt=""
            className="h-full w-full object-cover"
          />
          {/* Soft airy cream-pastel veil keeping photography bright & dreamy */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/75 via-[#FFFDF9]/35 to-[#FFFDF9]/82" />
        </motion.div>
      </AnimatePresence>

      {/* Top 2-Row Frosted Cream Pill Control Bar */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-2.5 px-4">
        <div
          role="tablist"
          aria-label="Collection categories"
          className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#9D4463]/20 bg-[#FFFDF9]/90 p-1.5 shadow-sm backdrop-blur-md"
        >
          {CATEGORY_TABS.map((tab) => {
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleCategoryChange(tab.id)}
                className={`min-h-[36px] rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#9D4463] text-white shadow-sm'
                    : 'text-[#5A4246] hover:text-[#362426]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Row 2: Design Quick-Jump Chips */}
        <div className="flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#9D4463]/15 bg-[#FFFDF9]/85 px-2.5 py-1 shadow-xs backdrop-blur-md">
          {visibleProducts.map((item, idx) => {
            const isCurrent = idx === safeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`min-h-[30px] rounded-full px-3 py-1 text-[11px] font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#FCECF0] text-[#9D4463] font-semibold ring-1 ring-[#9D4463]/30'
                    : 'text-[#6A5558] hover:text-[#362426]'
                }`}
              >
                {item.shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Stage: Pastel Stitched 3D Coverflow Carousel */}
      <div className="relative z-20 mx-auto my-4 flex w-full max-w-[1380px] flex-1 items-center justify-center px-4 sm:px-10">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous crochet piece"
          className="absolute left-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#9D4463]/20 bg-[#FFFDF9]/90 text-[#362426] shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white sm:left-6 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* 5-Card Coverflow Viewport */}
        <div
          className="relative flex h-[370px] w-full items-center justify-center sm:h-[430px]"
          style={{ perspective: '1400px' }}
        >
          {coverflowSlots.map(({ offset, idx, product }) => {
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);
            const xTranslate =
              offset === 0
                ? '0%'
                : offset === -1
                ? '-112%'
                : offset === 1
                ? '112%'
                : offset === -2
                ? '-196%'
                : '196%';

            const scale = isCenter ? 1 : absOffset === 1 ? 0.8 : 0.66;
            const rotateY = offset === 0 ? 0 : offset < 0 ? 12 : -12;
            const zIndex = isCenter ? 30 : absOffset === 1 ? 20 : 10;
            const opacity = isCenter ? 1 : absOffset === 1 ? 0.94 : 0.72;

            return (
              <motion.div
                key={`${product.id}-${offset}`}
                animate={
                  prefersReducedMotion
                    ? { opacity: isCenter ? 1 : 0.75 }
                    : {
                        x: xTranslate,
                        scale,
                        rotateY,
                        opacity,
                      }
                }
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 28,
                  mass: 0.8,
                }}
                style={{
                  zIndex,
                  backgroundColor: isCenter ? '#FFFDF9' : product.pastelSurface,
                }}
                className={`absolute flex flex-col overflow-hidden ${
                  isCenter
                    ? 'h-[355px] w-[265px] rounded-[28px] border-2 border-dashed border-[#D8A7B5] p-2.5 shadow-[0_24px_60px_rgba(120,68,85,0.22)] sm:h-[415px] sm:w-[315px]'
                    : 'hidden h-[290px] w-[210px] rounded-2xl border border-[#9D4463]/20 p-2.5 shadow-lg backdrop-blur-md md:flex sm:h-[320px] sm:w-[230px]'
                } ${absOffset === 2 ? 'lg:flex hidden!' : ''}`}
              >
                {isCenter ? (
                  <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[20px]">
                    <button
                      type="button"
                      onClick={() => onQuickView(product)}
                      aria-label={`Inspect ${product.name} in studio`}
                      className="group relative h-full w-full overflow-hidden rounded-[20px] cursor-pointer"
                    >
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        fallbackTitle={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </button>

                    {/* Delicate Floral Embroidery Corner Accent */}
                    <FloralStitchCorner className="absolute bottom-1.5 left-1.5 h-12 w-12 opacity-90" />

                    {/* Top-right Wishlist + Zoom */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onQuickView(product)}
                        aria-label={`Zoom details for ${product.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFDF9]/92 text-[#362426] shadow-sm transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleWishlist(product.id)}
                        aria-label="Toggle save design"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFDF9]/92 text-[#362426] shadow-sm transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            wishlistIds.includes(product.id)
                              ? 'fill-[#9D4463] text-[#9D4463]'
                              : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Focus ${product.name}`}
                    className="flex h-full w-full flex-col justify-between text-left cursor-pointer group"
                  >
                    <div className="relative h-[82%] w-full overflow-hidden rounded-xl bg-white">
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        fallbackTitle={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="pt-2 text-center">
                      <p className="truncate text-xs font-semibold text-[#362426]">
                        {product.shortName}
                      </p>
                    </div>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next crochet piece"
          className="absolute right-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#9D4463]/20 bg-[#FFFDF9]/90 text-[#362426] shadow-md backdrop-blur-md transition-all hover:scale-105 hover:bg-white sm:right-6 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Floating Cream Stitched Control Dock */}
      <div className="relative z-20 mx-auto w-full max-w-[800px] px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-dashed border-[#D8A7B5] bg-[#FFFDF9]/96 px-5 py-3.5 text-[#362426] shadow-[0_18px_45px_rgba(115,65,80,0.18)] backdrop-blur-md">
          <div className="min-w-[190px] flex-1">
            <button
              type="button"
              onClick={() => onQuickView(activeProduct)}
              className="text-left font-display text-base font-semibold text-[#362426] hover:text-[#9D4463] cursor-pointer"
            >
              {activeProduct.name}
            </button>
            <p className="text-xs font-medium text-[#715B5E]">
              {activeProduct.categoryLabel} · {activeProduct.craftHours} hrs handwork
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Pastel Yarn Swatches */}
            <div className="flex items-center gap-1.5" role="group" aria-label="Yarn shades">
              {activeProduct.swatches.map((swatch, idx) => (
                <button
                  key={swatch.name}
                  type="button"
                  title={swatch.name}
                  onClick={() => setSelectedSwatchIndex(idx)}
                  aria-label={`Select yarn shade ${swatch.name}`}
                  className={`h-6 w-6 rounded-full border transition-transform cursor-pointer ${
                    selectedSwatchIndex === idx
                      ? 'scale-110 border-[#9D4463] ring-2 ring-[#9D4463]/25'
                      : 'border-[#362426]/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: swatch.hex }}
                />
              ))}
            </div>

            <span className="hidden h-5 w-[1px] bg-[#362426]/15 sm:inline-block" aria-hidden="true" />

            {/* Size Pill */}
            <button
              type="button"
              onClick={cycleSize}
              title="Click to switch baby size"
              className="min-h-[36px] rounded-full border border-[#9D4463]/20 bg-[#FCECF0] px-3.5 py-1 text-xs font-semibold text-[#362426] transition-colors hover:bg-[#F7DCE3] tabular-nums cursor-pointer"
            >
              Size: {selectedSize}
            </button>

            {/* + Add to Bag CTA */}
            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-all active:scale-[0.97] whitespace-nowrap shrink-0 cursor-pointer ${
                justAdded ? 'bg-[#3C6E47]' : 'bg-[#9D4463] hover:bg-[#843651]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
