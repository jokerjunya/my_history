/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#10B981",
        background: "#F9FAFB",
        card: "#FFFFFF",
        text: {
          primary: "#111827",
          secondary: "#4B5563",
        },
      },
      fontSize: {
        xl: '1.5rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
  },
  plugins: [],
}

