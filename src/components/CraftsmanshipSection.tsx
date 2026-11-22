import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { BACKDROPS, YARN_SPEC_PROFILES } from '../data/products';
import { ResilientImage } from './ResilientImage';
import { CrochetLaceDivider, FloralStitchCorner } from './CrochetDecor';

export function CraftsmanshipSection() {
  const craftRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [selectedYarnId, setSelectedYarnId] = useState(YARN_SPEC_PROFILES[0].id);

  const { scrollYProgress } = useScroll({
    target: craftRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const selectedYarn =
    YARN_SPEC_PROFILES.find((y) => y.id === selectedYarnId) ?? YARN_SPEC_PROFILES[0];

  const productionStages = [
    { step: 'Stage 01', title: 'Soft Pastel Yarn Dye', bg: '#FCECF0' },
    { step: 'Stage 02', title: 'Hand-Crochet Body', bg: '#EAF4FB' },
    { step: 'Stage 03', title: '3D Floral Embroidery', bg: '#F3EEFA' },
    { step: 'Stage 04', title: 'Heirloom Gift Wrapping', bg: '#EDF5EE' },
  ];

  const metricRows = [
    { label: 'Newborn Skin Softness', value: selectedYarn.metrics.softness, color: '#9D4463' },
    { label: 'Breathability', value: selectedYarn.metrics.breathability, color: '#5C9EC9' },
    { label: 'Wash Durability', value: selectedYarn.metrics.durability, color: '#6E9974' },
    { label: '3D Stitch Relief', value: selectedYarn.metrics.stitchRelief, color: '#8E6EC2' },
  ];

  return (
    <section id="craftsmanship" className="relative bg-[#FFFDF9]">
      <CrochetLaceDivider fillTop="#F7F3FD" fillBottom="#FCECF0" />

      {/* Section 03A: Handcraft Process Showcase with Pastel Stitched Card */}
      <div ref={craftRef} className="relative overflow-hidden py-16 lg:py-20">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: bgY, scale: 1.1 }}
          className="pointer-events-none absolute inset-0"
        >
          <ResilientImage
            src={BACKDROPS.yarnStudio}
            alt=""
            className="h-full w-full object-cover opacity-55"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCECF0]/75 via-[#FFFDF9]/55 to-[#FFFDF9]/85" />

        <div className="relative z-10 mx-auto max-w-[1160px] px-6">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[28px] border-2 border-dashed border-[#9D4463]/30 bg-[#FFFDF9]/94 p-6 shadow-[0_20px_55px_rgba(120,68,85,0.14)] backdrop-blur-md sm:p-10"
          >
            <FloralStitchCorner className="absolute -top-2 -right-2 h-14 w-14 opacity-85" />

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#9D4463]/15 pb-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#9D4463] uppercase">
                  Small-Batch Baby Atelier · Hand-Finished Craft
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-[#362426] sm:text-3xl">
                  Sculpted petals, cable pleats &amp; bullion-stitch embroidery
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#9D4463] tabular-nums">
                17–28 hrs handwork per ensemble
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              {productionStages.map((stage, index) => (
                <motion.div
                  key={stage.step}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  style={{ backgroundColor: stage.bg }}
                  className="rounded-2xl border border-dashed border-[#9D4463]/25 p-4"
                >
                  <p className="text-[11px] font-semibold text-[#9D4463]">{stage.step}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-[#362426]">
                    {stage.title}
                  </p>
                </motion.div>
              ))}
            </div>

            <p className="mt-6 max-w-[74ch] text-sm leading-relaxed text-[#644F52]">
              Chafe-free inner seams, OEKO-TEX certified natural cotton yarns, and hand-anchored
              pearl and rosebud motifs engineered to stay cloud-soft against newborn skin.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Section 03B: Interactive Pastel Yarn & Stitch Matrix */}
      <div className="relative overflow-hidden border-t border-[#9D4463]/12 bg-[#FDF6EC] py-16 lg:py-22">
        <ResilientImage
          src={BACKDROPS.embroidery}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[#FFFDF9]/78" />

        <div className="relative z-10 mx-auto max-w-[1160px] px-6">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-xs font-semibold tracking-[0.14em] text-[#9D4463] uppercase">
              02 · Baby-Safe Yarn &amp; Stitch Calibration
            </p>
            <h2
              className="mt-2 max-w-[26ch] font-display text-3xl font-semibold leading-tight text-[#362426] sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              Gentle cottons, fine merino &amp; archival linen embroidery threads
            </h2>
          </motion.div>

          {/* 4 Clickable Pastel Yarn Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {YARN_SPEC_PROFILES.map((yarn, idx) => {
              const isSelected = yarn.id === selectedYarnId;
              return (
                <motion.button
                  key={yarn.id}
                  type="button"
                  onClick={() => setSelectedYarnId(yarn.id)}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  style={{ backgroundColor: yarn.pastelBg }}
                  className={`rounded-2xl border-2 p-5 text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'border-solid border-[#9D4463] shadow-lg'
                      : 'border-dashed border-[#9D4463]/25 opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-[#362426]">
                      {yarn.name}
                    </h3>
                    <span className="text-xs font-semibold text-[#9D4463] tabular-nums shrink-0">
                      {yarn.weightTag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[#644F52]">{yarn.summary}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Active Spec Breakdown Panel */}
          <motion.div
            key={selectedYarn.id}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.85, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-5 rounded-[24px] border-2 border-dashed border-[#9D4463]/28 bg-[#FFFDF9] p-6 text-[#362426] shadow-xl sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#9D4463]/12 pb-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#362426]">
                  {selectedYarn.name}
                </h3>
                <p className="text-xs font-medium text-[#715B5E]">{selectedYarn.weightTag}</p>
              </div>
              <span className="rounded-full bg-[#FCECF0] px-4 py-1.5 text-xs font-semibold text-[#9D4463]">
                Tap Yarn Cards Above to Compare
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#644F52]">
              {selectedYarn.detailDescription}
            </p>

            {/* 4 Animated Progress Metric Bars */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {metricRows.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-[#9D4463]/12 bg-[#FAF5F0] p-3.5"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#362426]">
                    <span>{metric.label}</span>
                    <span className="tabular-nums">{metric.value}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#362426]/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
