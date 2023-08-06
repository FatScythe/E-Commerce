/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#11345A",
        secondary: "#BAE8F2",
        tomato: "#FF6363",
        yellowish: "#caca96",
        bkg: "#171819",
        muted: "#C9CBCF",
        accent: "#66CCC1",
      },
      dropShadow: {
        "text-sm": "1px 1px 0px rgba(0, 0, 0, 0.90)",
        "text-md": "1px 2px 0px rgba(0, 0, 0, 0.90)",
        "text-lg": "1px 4px 0px rgba(0, 0, 0, 0.90)",
        "text-sh": "7px 5px 5px rgba(0, 0, 0, 0.90)",
      },
      backgroundImage: {
        hero: "url('/src/assets/images/a10.jpeg')",
      },
      fontFamily: {
        mon: ["Monton", "cursive"],
      },
      fontSize: {
        xs: "0.7rem",
        sm: "0.8rem",
        normal: "1rem",
        base: "1.2rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": ["clamp(1.60rem, calc(1.08rem + 2.59vw), 2.93rem)", "1.2"],
        "3xl": ["clamp(1.80rem, calc(1.08rem + 3.63vw), 3.66rem)", "1.1"],
        "4xl": ["clamp(2.03rem, calc(1.03rem + 4.98vw), 4.58rem)", "1"],
        "5xl": ["clamp(2.28rem, calc(0.94rem + 6.71vw), 5.72rem)", "1"],
        "6xl": ["clamp(2.57rem, calc(0.78rem + 8.95vw), 7.15rem)", "1"],
      },
    },
  },
  plugins: [],
};
