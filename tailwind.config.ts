import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060A14",
          900: "#0A1020",
          800: "#101A33",
        },
        ivory: {
          50: "#FFFDF7",
          100: "#F9F3E6",
          200: "#EFE5D2",
        },
        gold: {
          300: "#E7D08B",
          400: "#D8B766",
          500: "#C7A24E",
        },
      },
      boxShadow: {
        soft: "0 1px 0 rgba(255,255,255,0.06), 0 24px 80px rgba(0,0,0,0.35)",
        card: "0 1px 0 rgba(255,255,255,0.06), 0 16px 48px rgba(0,0,0,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      letterSpacing: {
        tightish: "-0.02em",
      },
    },
  },
  plugins: [],
} satisfies Config;

