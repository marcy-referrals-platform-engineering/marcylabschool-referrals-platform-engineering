import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary1: "#a6c2b4",
        primary2: "#c6d7e8",
      },
      screens: {
        'xs': {'min': '400px'}, // Custom breakpoint
      },
    },
  },
  plugins: [],
};

export default config;