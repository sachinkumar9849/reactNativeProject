// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4F95",
          light: "#3A6CB5",
          dark: "#0F3875"
        },
        secondary: "#4A90E2",
        accent: "#F5A623",
        error: "#D32F2F",
        success: "#4CAF50",
        warning: "#FFC107",
        background: "#F5F5F5",
        text: {
          primary: "#333333",
          secondary: "#666666",
          light: "#999999"
        }
      },
      fontFamily: {
        sourceProSemibold: ['source-sans-pro-semibold', 'sans-serif'],
       
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px'
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px'
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px'
      }
    }
  },
  plugins: []
};