import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // paleta de cores customizada
      colors: {
        'background': 'rgb(239, 227, 194)', // bege/creme
        'text-dark': 'rgb(18, 53, 36)',      // verde escuro para textos
        'primary': 'rgb(62, 123, 39)',       // Verde principal para botões e destaques
        'accent': 'rgb(133, 169, 71)',      // Verde mais claro para acentos visuais
      },
      fontFamily: {
        //  fonte Poppins
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;