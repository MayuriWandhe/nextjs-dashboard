/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lamaSky : '#C3EBFA',
        lamaSkyLight : '#EDF9FD',
        lamaPurpule : '#CFCEFF',
        lamaPurpuleLight : '#F1F0FF',
        lamaYellow : '#FAE27C',
        lamaYellowLight : '#FEFCE8'
      },
    },
  },
  plugins: [],
};
