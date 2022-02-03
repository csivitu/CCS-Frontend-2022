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
        "peach": "#ECE0D8",
        "gray-dark": "#131313",
        "gray-light": "#ECE0D8",
        "tech": "#477BFF",
        "management": "#F5A20A",
        "video": "#FF5247",
        "design": "#9747FF",
      },
      backgroundImage: {
        "grid": "url('/assets/grid.png')",
        "designbg": "url('/assets/grid.png')",
        "managementbg": "url('/assets/management-bg.svg')",
        "techbg": "url('/assets/tech-bg.svg')",
        "videobg": "url('/assets/video-bg.svg')",
      }
    },
  },
  variants: {
    fill: ['hover', 'focus'],
  },
  plugins: [],
};
