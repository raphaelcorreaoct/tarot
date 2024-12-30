import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inria-sans': ['Inria Sans', 'sans-serif'],
        'inknut-antiqua': ['var(--font-inknut-antiqua)', 'serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: '#9A04DF',
        suport: '#FF56DA'
      },
    },
  },
  plugins: [],
} satisfies Config;
