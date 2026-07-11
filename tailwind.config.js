/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#12151B",
        surface: "#1B1F27",
        surfaceRaised: "#232833",
        border: "#2A2F3A",
        text: "#F3F1EC",
        muted: "#8A93A3",
        urgent: "#E63950",
        urgentDim: "#5C1E27",
        safe: "#F2B134",
        active: "#35C7A6",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
