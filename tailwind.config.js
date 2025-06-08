/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          90: "#1d4ed8",
        },
        input: "#d1d5db",
        accent: "#e5e7eb",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
