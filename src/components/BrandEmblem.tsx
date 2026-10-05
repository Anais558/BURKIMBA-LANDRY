import React from 'react';

interface BrandEmblemProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withTagline?: boolean;
  variant?: 'red-gold' | 'dark' | 'light';
}

export const BrandEmblem: React.FC<BrandEmblemProps> = ({
  className = '',
  size = 'md',
  withTagline = false,
  variant = 'red-gold'
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-sm',
    xl: 'w-20 h-20 text-base'
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'red-gold':
        return 'border-2 border-red-600 bg-white text-red-600 shadow-xs';
      case 'light':
        return 'border-2 border-amber-400 bg-stone-900 text-amber-300 shadow-sm';
      case 'dark':
      default:
        return 'border border-stone-300 bg-white text-stone-900 shadow-2xs';
    }
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div
        className={`${sizeMap[size]} rounded-full flex items-center justify-center font-extrabold tracking-wider transition-all relative ${getVariantStyles()}`}
      >
        <span className="font-mono">BT</span>
        {variant === 'red-gold' && (
          <span className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
        )}
      </div>
      {withTagline && (
        <span className="text-[10px] uppercase tracking-widest mt-1 font-bold text-red-700">
          Burkimba Transit
        </span>
      )}
    </div>
  );
};
