/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14B8A6",
        secondary: "#6366F1",
        accent: "#FDE047",
        warning: "#F97316",
        background: "#FFFDF7",
        card: "#FFFFFF",
        text: "#111827",
      },
    },
  },
  plugins: [],
};
