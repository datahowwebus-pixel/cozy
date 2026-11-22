import { motion, useReducedMotion } from 'motion/react';
import { BACKDROPS } from '../data/products';
import { ResilientImage } from './ResilientImage';
import { CrochetLaceDivider, FloralStitchCorner } from './CrochetDecor';

interface FooterProps {
  onOpenBespoke: () => void;
  onOpenInquiry: () => void;
}

export function Footer({ onOpenBespoke, onOpenInquiry }: FooterProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer className="relative overflow-hidden bg-[#FCECF0]">
      <CrochetLaceDivider fillTop="#FCECF0" fillBottom="#FFFDF9" />

      <div className="relative py-20">
        <ResilientImage
          src={BACKDROPS.embroidery}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[#FFFDF9]/72" />

        {/* Centered Stitched Cream Keepsake Footer Card */}
        <div className="relative z-10 mx-auto max-w-[780px] px-6">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="relative rounded-[26px] border-2 border-dashed border-[#9D4463]/30 bg-[#FFFDF9]/95 p-7 shadow-xl backdrop-blur-md sm:p-9"
          >
            <FloralStitchCorner className="absolute -top-2 -right-2 h-14 w-14 opacity-85" />

            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-xl font-semibold tracking-tight text-[#362426]">
                  Cozy Crochet &amp; Embroidery
                </p>
                <p className="text-xs font-semibold text-[#9D4463]">
                  Handcrafted Baby Couture &amp; Keepsakes
                </p>
              </div>

              <a
                href="#studio"
                className="inline-flex min-h-[38px] items-center rounded-full bg-[#9D4463] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#843651]"
              >
                Back to 3D Studio
              </a>
            </div>

            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-[#644F52]">
              Small-batch baby atelier specializing in hand-crocheted pastel frocks, floral sun
              hats, bullion-embroidered knit cardigans, heirloom blankets, and custom name
              keepsakes.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#9D4463]/15 pt-5 text-xs font-medium text-[#715B5E]">
              <a href="#studio" className="hover:text-[#9D4463]">
                3D Studio Carousel
              </a>
              <a href="#collection-showcase" className="hover:text-[#9D4463]">
                Collection Showcase
              </a>
              <button
                type="button"
                onClick={onOpenBespoke}
                className="hover:text-[#9D4463] cursor-pointer"
              >
                Custom Embroidery
              </button>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="hover:text-[#9D4463] cursor-pointer"
              >
                Inquiry Bag
              </button>
              <a
                href="https://www.instagram.com/reel/DfJdM6uAT-9/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#9D4463] hover:underline"
              >
                Instagram Reel
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
