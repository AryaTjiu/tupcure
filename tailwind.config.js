/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors : {
        "white" : "#ffff",
        "purple-0.1" : "#F6F4FF",
        "purple-1" : "#5534D8",
        "yellow-1" : "#FFCA10",
        "sky-blue-1" : "#0085FF",
        "dark-blue-1" : "#002959",
        "gray-1" : "#292929",
        "gray-2" : "#848484",
        "gray-2.5" : "#B3B3B3",
        "gray-3" : "#F8F8F8"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        opensans : ["Open Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
};
