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
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#3b82f6",
          "primary-focus": "#2779bd",
          "primary-content": "#ffffff",
          "secondary": "#6366f1",
          "secondary-content": "#ffffff",
          "secondary-focus": "#f9d002",
          "accent": "#38c172",
          "accent-focus": "#2d995b",
          "accent-content": "#ffffff",
          "base-100": "#121212", // 1d1e1f
          "base-200": "#101010",
          "base-300": "#101010",
          'base-content': '#eceef2',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
