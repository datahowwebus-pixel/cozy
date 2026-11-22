import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { BABY_SIZES, CUSTOM_YARN_PALETTE, PRODUCTS } from '../data/products';
import { BabySize, Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface BespokeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomToInquiry: (
    baseProduct: Product,
    size: BabySize,
    quantity: number,
    customEmbroidery: string,
    customPalette: string
  ) => void;
}

export function BespokeModal({
  isOpen,
  onClose,
  onAddCustomToInquiry,
}: BespokeModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedBaseId, setSelectedBaseId] = useState(PRODUCTS[0].id);
  const [primaryShade, setPrimaryShade] = useState(CUSTOM_YARN_PALETTE[0].name);
  const [floralShade, setFloralShade] = useState(CUSTOM_YARN_PALETTE[5].name);
  const [size, setSize] = useState<BabySize>('3–6M');
  const [quantity, setQuantity] = useState(1);
  const [monogram, setMonogram] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const baseProduct = PRODUCTS.find((p) => p.id === selectedBaseId) ?? PRODUCTS[0];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const paletteLabel = `${primaryShade} base + ${floralShade} florals`;
    const embroideryLabel = monogram.trim() || 'Atelier Floral Crest';
    onAddCustomToInquiry(baseProduct, size, quantity, embroideryLabel, paletteLabel);
    setSubmitted(true);
    window.setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 650);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bespoke-modal-title"
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
            className="relative z-10 max-h-[90vh] w-full max-w-[820px] overflow-y-auto rounded-[28px] border-2 border-dashed border-[#D8A7B5] bg-[#FFFDF9] p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close bespoke studio"
              className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FCECF0] text-[#362426] transition-colors hover:bg-[#F7DCE3] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-semibold tracking-wider text-[#9D4463] uppercase">
              Custom Pastel Color &amp; Embroidery Studio
            </p>
            <h2
              id="bespoke-modal-title"
              className="mt-1 font-display text-2xl font-semibold text-[#362426] sm:text-3xl"
            >
              Configure a Custom Atelier Baby Set
            </h2>
            <p className="mt-2 text-sm text-[#644F52]">
              Pick any base design, pair soft nursery yarn hues, and add baby name embroidery for
              a direct studio quote.
            </p>

            <form onSubmit={handleConfirm} className="mt-6 space-y-6">
              {/* Step 1: Base Silhouette */}
              <div>
                <span className="text-xs font-semibold text-[#362426]">
                  1. Select Base Design ({baseProduct.name})
                </span>
                <div className="mt-2.5 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                  {PRODUCTS.slice(0, 5).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedBaseId(item.id)}
                      className={`group flex flex-col overflow-hidden rounded-xl border text-left transition-all cursor-pointer ${
                        selectedBaseId === item.id
                          ? 'border-[#9D4463] bg-[#FCECF0] ring-2 ring-[#9D4463]/25'
                          : 'border-[#9D4463]/15 bg-white hover:border-[#9D4463]/40'
                      }`}
                    >
                      <div className="aspect-square w-full overflow-hidden bg-[#FAF5F0]">
                        <ResilientImage
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="truncate px-2 py-1.5 text-[11px] font-medium text-[#362426]">
                        {item.shortName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Color Pairing */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <span className="text-xs font-semibold text-[#362426]">
                    2. Main Dress Yarn ({primaryShade})
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {CUSTOM_YARN_PALETTE.map((swatch) => (
                      <button
                        key={`base-${swatch.name}`}
                        type="button"
                        onClick={() => setPrimaryShade(swatch.name)}
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium cursor-pointer ${
                          primaryShade === swatch.name
                            ? 'border-[#9D4463] bg-[#FCECF0] text-[#362426]'
                            : 'border-[#9D4463]/15 bg-white text-[#644F52]'
                        }`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/15"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span>{swatch.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#362426]">
                    3. Embroidered Rose Accent ({floralShade})
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {CUSTOM_YARN_PALETTE.map((swatch) => (
                      <button
                        key={`floral-${swatch.name}`}
                        type="button"
                        onClick={() => setFloralShade(swatch.name)}
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium cursor-pointer ${
                          floralShade === swatch.name
                            ? 'border-[#9D4463] bg-[#FCECF0] text-[#362426]'
                            : 'border-[#9D4463]/15 bg-white text-[#644F52]'
                        }`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/15"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span>{swatch.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Size, Quantity & Monogram */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <span className="text-xs font-semibold text-[#362426]">4. Baby Size</span>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as BabySize)}
                    className="mt-2 min-h-[42px] w-full rounded-xl border border-[#9D4463]/20 bg-white px-3 text-sm text-[#362426] focus:border-[#9D4463] focus:outline-none cursor-pointer"
                  >
                    {BABY_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="bespoke-qty" className="text-xs font-semibold text-[#362426]">
                    5. Quantity (Pieces)
                  </label>
                  <input
                    id="bespoke-qty"
                    type="number"
                    min={1}
                    max={100}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                    className="mt-2 min-h-[42px] w-full rounded-xl border border-[#9D4463]/20 bg-white px-3.5 text-sm text-[#362426] tabular-nums focus:border-[#9D4463] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bespoke-monogram"
                    className="text-xs font-semibold text-[#362426]"
                  >
                    6. Baby Name / Initials
                  </label>
                  <input
                    id="bespoke-monogram"
                    type="text"
                    maxLength={24}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value)}
                    placeholder="e.g. Zoya · 2026"
                    className="mt-2 min-h-[42px] w-full rounded-xl border border-[#9D4463]/20 bg-white px-3.5 text-sm text-[#362426] placeholder:text-[#A38E92] focus:border-[#9D4463] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#9D4463]/12 pt-5">
                <p className="text-xs text-[#715B5E]">
                  Turnaround: 7–10 days for single sets · Custom quotes sent via WhatsApp
                </p>

                <button
                  type="submit"
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all cursor-pointer ${
                    submitted ? 'bg-[#3C6E47]' : 'bg-[#9D4463] hover:bg-[#843651]'
                  }`}
                >
                  {submitted ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Inquiry Bag</span>
                    </>
                  ) : (
                    <span>Add Custom Set to Inquiry</span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
