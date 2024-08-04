import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "login-border": "#C1C1C1",
        "input-color": "#848484",
        "gray-color": "#333333",
      },
      fontSize: {
        heading: "32px",
      },
      lineHeight: {
        "heading-line-height": "38.73px",
        "text-line-height": "19.36px",
        "login-heading-line-height": "29.05px",
      },
      borderWidth: {
        "app-border": "1px",
        // Add other custom border widths here if needed
      },
    },
  },
  plugins: [],
} satisfies Config;
