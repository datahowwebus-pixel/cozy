import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ZoomIn, ZoomOut, Plus, Minus, Check, Heart } from 'lucide-react';
import { BabySize, Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: Product | null;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (productId: string) => void;
  onAddToInquiry: (
    product: Product,
    size: BabySize,
    quantity: number,
    customEmbroidery?: string
  ) => void;
}

export function ProductModal({
  product,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToInquiry,
}: ProductModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedSize, setSelectedSize] = useState<BabySize>('3–6M');
  const [quantity, setQuantity] = useState(1);
  const [embroideryText, setEmbroideryText] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [addedConfirm, setAddedConfirm] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] ?? '3–6M');
      setQuantity(1);
      setEmbroideryText('');
      setIsZoomed(false);
      setAddedConfirm(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  const trimmedEmbroidery = embroideryText.trim();

  const handleSubmit = () => {
    if (!product) return;
    onAddToInquiry(product, selectedSize, quantity, trimmedEmbroidery || undefined);
    setAddedConfirm(true);
    window.setTimeout(() => {
      setAddedConfirm(false);
      onClose();
    }, 650);
  };

  return (
    <AnimatePresence>
      {product && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdp-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#362426]/45 backdrop-blur-xs"
          />

          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.97, y: 8 }
            }
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 grid max-h-[90vh] w-full max-w-[980px] grid-cols-1 overflow-y-auto rounded-[28px] border-2 border-dashed border-[#D8A7B5] bg-[#FFFDF9] shadow-2xl lg:grid-cols-12"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product specifications"
              className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FCECF0] text-[#362426] transition-colors hover:bg-[#F7DCE3] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Sticky Photo Preview */}
            <div className="relative bg-[#FCECF0]/60 p-3 lg:col-span-6 lg:p-4">
              <div className="relative aspect-[4/3] h-full w-full overflow-hidden rounded-2xl bg-white lg:aspect-auto lg:min-h-[500px]">
                <ResilientImage
                  src={product.image}
                  alt={product.imageAlt}
                  fallbackTitle={product.name}
                  className={`h-full w-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isZoomed ? 'scale-125' : 'scale-100'
                  }`}
                />
              </div>

              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                aria-label={isZoomed ? 'Reset zoom' : 'Zoom in to inspect stitches'}
                className="absolute right-7 bottom-7 inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#9D4463]/20 bg-[#FFFDF9]/92 px-3.5 py-1.5 text-xs font-semibold text-[#362426] shadow-sm backdrop-blur-sm transition-colors hover:bg-white cursor-pointer"
              >
                {isZoomed ? (
                  <>
                    <ZoomOut className="h-3.5 w-3.5 text-[#9D4463]" aria-hidden="true" />
                    <span>Reset Zoom</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="h-3.5 w-3.5 text-[#9D4463]" aria-hidden="true" />
                    <span>Inspect Stitches</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Spec & Inquiry Module (Zero rates/prices) */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6">
              <div>
                <p className="text-xs font-medium text-[#715B5E]">
                  {product.sku} · {product.categoryLabel} · {product.craftHours} hrs handwork
                </p>

                <h2
                  id="pdp-modal-title"
                  className="mt-2 pr-8 font-display text-2xl font-semibold leading-tight text-[#362426] sm:text-3xl"
                >
                  {product.name}
                </h2>

                <p className="mt-2 text-xs font-semibold tracking-wider text-[#9D4463] uppercase">
                  {product.availabilityLabel} · Custom Baby Sizing &amp; Quote on Inquiry
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#644F52]">
                  {product.description}
                </p>

                {/* Included Pieces Breakdown */}
                <div className="mt-5 border-t border-[#9D4463]/12 pt-4">
                  <p className="text-xs font-semibold tracking-wider text-[#9D4463] uppercase">
                    Included Set Components
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#362426]">
                    {product.piecesIncluded.map((piece) => (
                      <li key={piece} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[#9D4463] shrink-0" aria-hidden="true" />
                        <span>{piece}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size Selector */}
                <div className="mt-5 border-t border-[#9D4463]/12 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#362426]">Select Baby Size</span>
                    <span className="text-xs text-[#715B5E]">Custom measurements supported</span>
                  </div>
                  <div className="mt-2.5 grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`min-h-[40px] rounded-xl border text-xs font-semibold transition-colors cursor-pointer tabular-nums ${
                          selectedSize === size
                            ? 'border-[#9D4463] bg-[#9D4463] text-white'
                            : 'border-[#9D4463]/20 bg-[#FCECF0]/60 text-[#362426] hover:bg-[#FCECF0]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Custom Embroidery Monogram */}
                <div className="mt-5">
                  <label
                    htmlFor="custom-embroidery-input"
                    className="flex items-center justify-between text-xs font-semibold text-[#362426]"
                  >
                    <span>Custom Name / Initials Embroidery</span>
                    <span className="font-normal text-[#715B5E]">Optional</span>
                  </label>
                  <input
                    id="custom-embroidery-input"
                    type="text"
                    maxLength={22}
                    value={embroideryText}
                    onChange={(e) => setEmbroideryText(e.target.value)}
                    placeholder="e.g. Baby Noor · 2026"
                    className="mt-2 min-h-[42px] w-full rounded-xl border border-[#9D4463]/20 bg-white px-3.5 py-2 text-sm text-[#362426] placeholder:text-[#A38E92] focus:border-[#9D4463] focus:outline-none"
                  />
                </div>

                {/* Yarn & Care Specifications */}
                <div className="mt-5 grid grid-cols-1 gap-2 rounded-2xl border border-dashed border-[#9D4463]/20 bg-[#FAF5F0] p-3.5 text-xs text-[#644F52]">
                  <div>
                    <strong className="font-semibold text-[#362426]">Yarn: </strong>
                    {product.yarnComposition}
                  </div>
                  <div>
                    <strong className="font-semibold text-[#362426]">Stitchwork: </strong>
                    {product.stitchStyle}
                  </div>
                  <div>
                    <strong className="font-semibold text-[#362426]">Care: </strong>
                    {product.careNote}
                  </div>
                </div>
              </div>

              {/* Sticky Inquiry Action Row */}
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#9D4463]/12 pt-5">
                <div className="flex items-center rounded-xl border border-[#9D4463]/20 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="inline-flex h-11 w-10 items-center justify-center text-[#362426] hover:bg-[#FCECF0] cursor-pointer"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-[#362426] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(50, q + 1))}
                    aria-label="Increase quantity"
                    className="inline-flex h-11 w-10 items-center justify-center text-[#362426] hover:bg-[#FCECF0] cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 cursor-pointer ${
                    addedConfirm
                      ? 'bg-[#3C6E47]'
                      : 'bg-[#9D4463] hover:bg-[#843651] active:scale-[0.98]'
                  }`}
                >
                  {addedConfirm ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Added to Inquiry Bag</span>
                    </>
                  ) : (
                    <span className="tabular-nums">
                      Add to Inquiry Bag ({quantity} {quantity === 1 ? 'Piece' : 'Pieces'})
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  aria-label={isWishlisted ? 'Remove from saved designs' : 'Save design'}
                  aria-pressed={isWishlisted}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#9D4463]/20 bg-white text-[#362426] hover:bg-[#FCECF0] cursor-pointer"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isWishlisted ? 'fill-[#9D4463] text-[#9D4463]' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
