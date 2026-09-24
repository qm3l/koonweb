import React from 'react';
import Script from 'next/script';
import '@/app/globals.css';

export const metadata = {
  icons: { icon: '/brand/koon-icon.png' },
  title: 'KOON • Quiet-Tech Anime World',
  description: 'منصة مشاهدة الأنمي التكتيكية عبر تيليجرام WebApp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-koon-bg text-gray-100 antialiased font-sans selection:bg-koon-cyan selection:text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
