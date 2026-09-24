module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        koon: {
          bg: "#070512",
          card: "#120D22",
          border: "#2A2045",
          purple: "#7C3AED",
          neonBlue: "#38BDF8",
        }
      },
      boxShadow: {
        'neon': '0 0 20px rgba(124, 58, 237, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
};
