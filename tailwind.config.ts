import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        koon: {
          bg: "#0b0d12",        // الخلفية الأساسية الداكنة
          surface: "#121620",   // خلفية البطاقات والحاويات
          border: "#1f2638",    // الحدود الناعمة
          cyan: "#00f0ff",      // النيون الأساسي
          lime: "#ccff00",      // اللون التكتيكي (مثل حقل البحث)
          muted: "#8a94a6",     // النصوص الثانوية
        },
      },
      fontFamily: {
        sans: ["var(--font-readex)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
