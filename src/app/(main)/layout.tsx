import React from 'react';
import { BottomNav } from '@/components/navigation/BottomNav';
export default function MainLayout({ children }: { children: React.ReactNode }) { return <><main>{children}</main><BottomNav /></>; }
