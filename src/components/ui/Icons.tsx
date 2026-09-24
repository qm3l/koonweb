import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// أيقونة البحث الهندسية
export const SearchIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" className={className} {...props}>
    <path d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
    <path d="M15 15l5.5 5.5" />
    <path d="M17 10h2" strokeOpacity="0.5" />
  </svg>
);

// أيقونة الرئيسية
export const HomeIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" className={className} {...props}>
    <path d="M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z" />
  </svg>
);

// أيقونة المكتبة
export const LibraryIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" className={className} {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

// أيقونة الحساب / الدرع
export const ProfileIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" className={className} {...props}>
    <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V6l-9-4z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// أيقونة مركز الاختصارات (Quick Hub)
export const HubGridIcon: React.FC<IconProps> = ({ size = 22, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

// أيقونة الفلترة التكتيكية
export const FilterIcon: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const Icons = {
  SearchIcon,
  HomeIcon,
  LibraryIcon,
  ProfileIcon,
  HubGridIcon,
  FilterIcon,
  // Mapping for BottomNav & Components using direct names
  Home: HomeIcon,
  Search: SearchIcon,
  Bookmark: LibraryIcon,
  User: ProfileIcon,
  Profile: ProfileIcon,
  Library: LibraryIcon,
};

export default Icons;
