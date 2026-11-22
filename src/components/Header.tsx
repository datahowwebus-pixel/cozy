import { ClipboardList, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  inquiryCount: number;
  onOpenInquiry: () => void;
  onOpenBespoke: () => void;
}

export function Header({ inquiryCount, onOpenInquiry, onOpenBespoke }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '3D Studio', href: '#studio' },
    { label: 'Collection', href: '#collection-showcase' },
    { label: 'Craftsmanship', href: '#craftsmanship' },
    { label: 'Custom Orders', href: '#studio', action: onOpenBespoke },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#9D4463]/15 bg-[#FFFDF9]/92 text-[#362426] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#studio"
          className="font-display text-lg font-semibold tracking-tight text-[#362426] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9D4463]"
        >
          Cozy Crochet &amp; Embroidery
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#715B5E]"
        >
          {navLinks.map((item) =>
            item.action ? (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="relative py-1 transition-colors duration-150 hover:text-[#9D4463] whitespace-nowrap shrink-0 cursor-pointer after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#9D4463] after:transition-all after:duration-200 hover:after:w-full"
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="relative py-1 transition-colors duration-150 hover:text-[#9D4463] whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#9D4463] after:transition-all after:duration-200 hover:after:w-full"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Zone 3: 1 primary Berry Rose capsule action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenInquiry}
            aria-label={`Open inquiry bag, ${inquiryCount} items`}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[#9D4463] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#843651] active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Inquiry Bag</span>
            {inquiryCount > 0 && <span className="tabular-nums">({inquiryCount})</span>}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#9D4463]/20 text-[#362426] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[#9D4463]/10 bg-[#FFFDF9] px-6 py-4 md:hidden"
          >
            <div className="flex flex-col gap-3 text-sm font-medium text-[#362426]">
              {navLinks.map((item) =>
                item.action ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      item.action?.();
                    }}
                    className="min-h-[44px] text-left hover:text-[#9D4463] cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-[44px] items-center hover:text-[#9D4463]"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
