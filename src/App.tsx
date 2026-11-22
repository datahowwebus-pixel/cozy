import { useCallback, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ClipboardList } from 'lucide-react';
import { ExtendedProduct, PRODUCTS } from './data/products';
import { BabySize, InquiryItem, Product } from './types';
import { StitchScrollProgress } from './components/CrochetDecor';
import { Header } from './components/Header';
import { StudioCarouselHero } from './components/StudioCarouselHero';
import { ShowcaseBands } from './components/ShowcaseBands';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { SupplyTestimonialsSection } from './components/SupplyTestimonialsSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { BespokeModal } from './components/BespokeModal';
import { InquiryDrawer } from './components/InquiryDrawer';

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isBespokeOpen, setIsBespokeOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [focusedPiece, setFocusedPiece] = useState<{
    product: ExtendedProduct;
    size: BabySize;
  }>({
    product: PRODUCTS[0],
    size: '3–6M',
  });

  const handleActiveProductChange = useCallback(
    (product: ExtendedProduct, size: BabySize) => {
      setFocusedPiece({ product, size });
    },
    []
  );

  const triggerToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3000);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToInquiry = (
    product: Product,
    size: BabySize,
    quantity = 1,
    customEmbroidery?: string,
    customPalette?: string
  ) => {
    const inquiryKey = `${product.id}__${size}__${customEmbroidery ?? ''}__${customPalette ?? ''}`;

    setInquiryItems((prev) => {
      const existing = prev.find((item) => item.inquiryKey === inquiryKey);
      if (existing) {
        return prev.map((item) =>
          item.inquiryKey === inquiryKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          inquiryKey,
          productId: product.id,
          sku: product.sku,
          name: customPalette ? `${product.name} (Custom)` : product.name,
          image: product.image,
          size,
          quantity,
          customEmbroidery,
          customPalette,
        },
      ];
    });

    triggerToast(`Added ${product.name} (${size}) to Inquiry Bag`);
  };

  const handleUpdateQty = (inquiryKey: string, delta: number) => {
    setInquiryItems((prev) =>
      prev
        .map((item) =>
          item.inquiryKey === inquiryKey
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (inquiryKey: string) => {
    setInquiryItems((prev) => prev.filter((item) => item.inquiryKey !== inquiryKey));
  };

  const inquiryCount = inquiryItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#FFFDF9] text-[#362426]">
      <StitchScrollProgress />

      <Header
        inquiryCount={inquiryCount}
        onOpenInquiry={() => setIsInquiryOpen(true)}
        onOpenBespoke={() => setIsBespokeOpen(true)}
      />

      <main>
        <StudioCarouselHero
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(product) => setQuickViewProduct(product)}
          onAddToInquiry={(product, size) => handleAddToInquiry(product, size, 1)}
          onActiveProductChange={handleActiveProductChange}
        />

        <ShowcaseBands
          onQuickView={(product) => setQuickViewProduct(product)}
          onOpenBespoke={() => setIsBespokeOpen(true)}
        />

        <CraftsmanshipSection />

        <SupplyTestimonialsSection onOpenInquiry={() => setIsInquiryOpen(true)} />
      </main>

      <Footer
        onOpenBespoke={() => setIsBespokeOpen(true)}
        onOpenInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Modals & Inquiry Drawer */}
      <ProductModal
        product={quickViewProduct}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onClose={() => setQuickViewProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToInquiry={(product, size, quantity, customEmbroidery) =>
          handleAddToInquiry(product, size, quantity, customEmbroidery)
        }
      />

      <BespokeModal
        isOpen={isBespokeOpen}
        onClose={() => setIsBespokeOpen(false)}
        onAddCustomToInquiry={(
          baseProduct,
          size,
          quantity,
          customEmbroidery,
          customPalette
        ) =>
          handleAddToInquiry(baseProduct, size, quantity, customEmbroidery, customPalette)
        }
      />

      <InquiryDrawer
        isOpen={isInquiryOpen}
        items={inquiryItems}
        onClose={() => setIsInquiryOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearItems={() => setInquiryItems([])}
      />

      {/* Floating Bottom-Right Active Design Status Dock */}
      <div className="pointer-events-none fixed right-4 bottom-4 z-30 hidden items-center gap-2 sm:flex">
        <button
          type="button"
          onClick={() => setQuickViewProduct(focusedPiece.product)}
          className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-[#9D4463]/20 bg-[#FFFDF9]/92 px-3.5 py-2 text-xs text-[#362426] shadow-md backdrop-blur-md transition-colors hover:border-[#9D4463] cursor-pointer"
        >
          <span
            className="h-2.5 w-2.5 rounded-full border border-black/15"
            style={{ backgroundColor: focusedPiece.product.swatches[0].hex }}
          />
          <span className="font-semibold">{focusedPiece.product.shortName}</span>
          <span className="text-[#715B5E]">·</span>
          <span className="tabular-nums text-[#715B5E]">{focusedPiece.size}</span>
        </button>

        <a
          href="#collection-showcase"
          className="pointer-events-auto inline-flex items-center rounded-full border border-[#9D4463]/20 bg-[#FCECF0]/95 px-3.5 py-2 text-xs font-semibold text-[#9D4463] shadow-md backdrop-blur-md transition-colors hover:bg-[#FCECF0]"
        >
          Explore Collection · Scroll
        </a>
      </div>

      {/* Add-to-Inquiry Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 left-5 z-40 flex items-center gap-3 rounded-full border border-[#9D4463]/25 bg-[#FFFDF9] px-4 py-2.5 text-xs font-medium text-[#362426] shadow-xl"
          >
            <ClipboardList className="h-4 w-4 text-[#9D4463] shrink-0" aria-hidden="true" />
            <span className="max-w-[260px] truncate">{toastMessage}</span>
            <button
              type="button"
              onClick={() => {
                setToastMessage(null);
                setIsInquiryOpen(true);
              }}
              className="ml-1 font-bold text-[#9D4463] underline underline-offset-4 cursor-pointer"
            >
              Open Bag
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
