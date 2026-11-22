/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    colors: {
      // Light theme built from the StudyNotion palette:
      // dark green #1A312C, teal #428475, mint #89D7B7, cream #FFF4E1.
      // The original scales were made for a dark UI, so each scale keeps its
      // role: low numbers of "richblack" are TEXT (now dark green) and high
      // numbers are BACKGROUNDS (now cream and light mint). "yellow" was the
      // button/accent colour and is now dark green. Every text shade below has
      // a contrast ratio of at least 4.5:1 on the backgrounds it is used on.
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",
      brand: {
        dark: "#1A312C",
        teal: "#428475",
        tealdeep: "#34695D",
        mint: "#89D7B7",
        cream: "#FFF4E1",
      },
      richblack: {
        5: "#1A312C", // primary text
        25: "#1E3832",
        50: "#233F38",
        100: "#28463F",
        200: "#2E4F47",
        300: "#36594F", // secondary text
        400: "#466A60", // muted text, placeholders
        500: "#8FB8A9", // strong borders, table headers
        600: "#B5DFCC", // borders
        700: "#D7EFE3", // inputs, hover
        800: "#EAF6EF", // cards, sidebar, navbar
        900: "#FFF4E1", // page background (cream)
      },
      richblue: {
        5: "#E6F7EF",
        25: "#C3EBDA",
        50: "#89D7B7",
        100: "#357366",
        200: "#2E6B5D",
        300: "#285F53",
        400: "#23564A",
        500: "#1F4C42",
        600: "#1A312C",
        700: "#162A26",
        800: "#122320",
        900: "#0E1C19",
      },
      blue: {
        5: "#E6F7EF",
        25: "#C3EBDA",
        50: "#89D7B7",
        100: "#2E6B5D", // links
        200: "#89D7B7", // soft shadows
        300: "#357366",
        400: "#2E6B5D",
        500: "#285F53",
        600: "#23564A",
        700: "#1F4C42",
        800: "#1A312C",
        900: "#122320",
      },
      caribbeangreen: {
        5: "#E6F7EF",
        25: "#89D7B7", // mint, for text on dark backgrounds
        50: "#357366",
        100: "#2E6B5D",
        200: "#285F53",
        300: "#23564A",
        400: "#1F4C42",
        500: "#1C3F37",
        600: "#1B3832",
        700: "#1A312C", // dark banner
        800: "#142824",
        900: "#0F1F1B",
      },
      brown: {
        5: "#FFF4C4",
        25: "#FFE395",
        50: "#FFD166",
        100: "#E7BC5B",
        200: "#CFA64F",
        300: "#B89144",
        400: "#A07C39",
        500: "#88662D",
        600: "#705122",
        700: "#593C17",
        800: "#41260B",
        900: "#291100",
      },
      pink: {
        // errors, required marks and the delete-account panel
        5: "#FFF0F3",
        25: "#7A1530", // dark red text on the light red panel
        50: "#B01E45",
        100: "#B4233F",
        200: "#C9184A",
        300: "#A0153E",
        400: "#8E1236",
        500: "#E9A3B4",
        600: "#F0BCC8",
        700: "#F5CBD5",
        800: "#FAD9E1",
        900: "#FDECEF", // light red panel
      },
      yellow: {
        // was the yellow button colour, now the dark brand colour
        5: "#36594F",
        25: "#24423B",
        50: "#1A312C", // primary buttons, accents
        100: "#2E6B5D", // accent text
        200: "#2E6B5D", // active lesson (light text on top)
        300: "#2F6B5D",
        400: "#2F6B5D",
        500: "#428475",
        600: "#89D7B7",
        700: "#B5E6D2",
        800: "#CDEFE0", // active sidebar link background
        900: "#E3F6EC", // active step background
      },
      "pure-greys": {
        5: "#FFFFFF",
        25: "#E2E2E2",
        50: "#CCCCCC",
        100: "#B5B5B5",
        200: "#9E9E9E",
        300: "#666666",
        400: "#717171",
        500: "#5B5B5B",
        600: "#444444",
        700: "#2D2D2D",
        800: "#D7EFE3",
        900: "#141414",
      },
    },
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px",
      },
    },
  },
  plugins: [],
};
