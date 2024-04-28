import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // mode: 'jit',
  // purge: [
  //   './public/**/*.html',
  //   './src/**/*.{js,jsx,ts,tsx,vue}',
  // ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'slate': {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617'
      },
      'type': {
        normal: "#a8a77a",
        fire: "#ee8130",
        water: "#6390f0",
        electric: "#f7d02c",
        grass: "#7ac74c",
        ice: "#96d9d6",
        fighting: "#c22e28",
        poison: "#a33ea1",
        ground: "#e2bf65",
        flying: "#a98ff3",
        psychic: "#f95587",
        bug: "#a6b91a",
        rock: "#b6a136",
        ghost: "#735797",
        dragon: "#6f35fc",
        dark: "#705746",
        steel: "#b7b7ce",
        fairy: "#d685ad",
      }
    }
  },
  plugins: [],
};
export default config;
