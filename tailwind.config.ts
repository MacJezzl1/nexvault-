import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        sand: "#f5efe6",
        amber: "#b85c38",
        moss: "#415d43",
        steel: "#5f6f78"
      },
      boxShadow: {
        vault: "0 20px 60px rgba(17, 17, 17, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
