import React from 'react';

interface BrandEmblemProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withTagline?: boolean;
  variant?: 'dark' | 'light';
}

export const BrandEmblem: React.FC<BrandEmblemProps> = ({
  className = '',
  size = 'md',
  withTagline = false,
  variant = 'dark'
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-sm',
    xl: 'w-20 h-20 text-base'
  };

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div
        className={`${sizeMap[size]} rounded-full flex items-center justify-center font-bold tracking-wider border transition-colors ${
          isLight
            ? 'border-stone-700 bg-stone-900 text-stone-100'
            : 'border-stone-300 bg-white text-stone-900 shadow-2xs'
        }`}
      >
        <span className="font-mono">BT</span>
      </div>
      {withTagline && (
        <span className={`text-[10px] uppercase tracking-widest mt-1 ${isLight ? 'text-stone-400' : 'text-stone-500'}`}>
          Burkimba Transit
        </span>
      )}
    </div>
  );
};
