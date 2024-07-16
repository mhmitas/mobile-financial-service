/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['dark',
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#1f6feb",
          "primary-content": "ffffff",
          "secondary": "#a3e635",
          "accent": "#f43f5e",
          "info": "#38bdf8",
          "success": "#22c55e",
          "warning": "#fbbf24",
          "error": "#ef4444",
          "base-100": "#ffffff",
          "base-200": "#f0f2f5",
          "base-300": "#f0f2f5",
          'base-content': 'black',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
