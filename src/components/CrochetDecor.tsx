import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export function StitchScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[3px] bg-transparent"
    >
      <motion.div
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="h-full w-full bg-gradient-to-r from-[#E6A4B4] via-[#9D4463] to-[#88C4E8]"
      />
    </div>
  );
}

interface CrochetLaceDividerProps {
  fillTop?: string;
  fillBottom?: string;
}

export function CrochetLaceDivider({
  fillTop = '#FFFDF9',
  fillBottom = '#FCECF0',
}: CrochetLaceDividerProps) {
  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden leading-none"
      style={{ backgroundColor: fillTop }}
    >
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        className="block h-6 w-full sm:h-8"
      >
        <defs>
          <pattern
            id="crochet-scallop-pattern"
            x="0"
            y="0"
            width="48"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 32 C 8 10, 16 10, 24 32 C 32 10, 40 10, 48 32 Z"
              fill={fillBottom}
            />
            <circle cx="12" cy="24" r="1.6" fill={fillTop} opacity="0.85" />
            <circle cx="36" cy="24" r="1.6" fill={fillTop} opacity="0.85" />
            <path
              d="M0 31 C 8 9, 16 9, 24 31 C 32 9, 40 9, 48 31"
              fill="none"
              stroke="#9D4463"
              strokeOpacity="0.22"
              strokeWidth="1.1"
              strokeDasharray="3 3"
            />
          </pattern>
        </defs>
        <rect x="0" y="0" width="1200" height="32" fill="url(#crochet-scallop-pattern)" />
      </svg>
    </div>
  );
}

export function FloralStitchCorner({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      className={`pointer-events-none ${className}`}
    >
      <path
        d="M8 54 C 14 38, 24 22, 48 12"
        stroke="#7E9F79"
        strokeWidth="1.6"
        strokeDasharray="3 3"
        strokeLinecap="round"
      />
      <circle cx="34" cy="22" r="5" fill="#F3C6CE" stroke="#9D4463" strokeWidth="1" />
      <circle cx="34" cy="22" r="1.8" fill="#9D4463" />
      <circle cx="22" cy="36" r="4" fill="#C7B5E3" stroke="#7A54A8" strokeWidth="0.9" />
      <circle cx="22" cy="36" r="1.4" fill="#FFFDF9" />
      <path
        d="M27 29 C 22 25, 21 20, 26 21 C 28 22, 28 26, 27 29 Z"
        fill="#A4C49E"
      />
      <path
        d="M40 16 C 44 12, 50 13, 47 18 C 45 20, 41 19, 40 16 Z"
        fill="#A4C49E"
      />
    </svg>
  );
}
