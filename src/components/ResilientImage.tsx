import { useState } from 'react';
import { Scissors } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Cozy Crochet & Embroidery',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#FCECF0] via-[#FFFDF9] to-[#EAF4FB] p-6 text-center text-[#715B5E] ${className}`}
      >
        <Scissors className="h-7 w-7 text-[#9D4463]" aria-hidden="true" />
        <p className="font-display text-base font-medium text-[#362426]">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
