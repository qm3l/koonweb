import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'lime' | 'muted' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase border rounded-md transition-colors';

  const variants = {
    cyan: 'bg-koon-cyan/10 text-koon-cyan border-koon-cyan/30',
    lime: 'bg-koon-lime/10 text-koon-lime border-koon-lime/30',
    muted: 'bg-black/40 text-gray-400 border-white/10',
    outline: 'bg-transparent text-gray-200 border-white/20',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
