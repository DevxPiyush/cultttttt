/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        violet: {
          300: "#5724ff",
        },
        yellow: {
          100: "#8e983f",
          300: "#edff66",
        },
      },
      // Added Wobble Animation Here
      keyframes: {
        wobble: {
          "0%, 100%": { transform: "translateX(0%)" },
          "15%": { transform: "translateX(-3%) rotate(-4deg)" },
          "30%": { transform: "translateX(2%) rotate(3deg)" },
          "45%": { transform: "translateX(-1.5%) rotate(-2deg)" },
          "60%": { transform: "translateX(1%) rotate(1deg)" },
          "75%": { transform: "translateX(-0.5%) rotate(-1deg)" },
        },
      },
      animation: {
        wobble: "wobble 0.8s ease-in-out",
      },
    },
  },
  plugins: [],
};
