import React from 'react';

interface PolygonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cyan' | 'lime' | 'glass';
  children: React.ReactNode;
}

export const PolygonButton: React.FC<PolygonButtonProps> = ({
  variant = 'cyan',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'polygon-btn font-mono text-xs font-semibold px-4 py-2 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50';

  const variants = {
    cyan: 'bg-koon-cyan/20 text-koon-cyan border border-koon-cyan/50 hover:bg-koon-cyan hover:text-black',
    lime: 'bg-koon-lime/20 text-koon-lime border border-koon-lime/50 hover:bg-koon-lime hover:text-black',
    glass: 'glass-panel text-gray-300 hover:text-white border-white/10 hover:border-koon-cyan/40',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
