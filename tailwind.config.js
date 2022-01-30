module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#__next",
  theme: {
    extend: {
      fontFamily: {
        'sans': ['General Sans']
      },
      colors: {
        "peach":"#ECE0D8",
        "gray-dark": "#131313",
        tech: "#477BFF",
        management: "#F5A20A",
        video: "#FF5247",
        design: "#9747FF",
      },
    },
  },
  plugins: [],
};
