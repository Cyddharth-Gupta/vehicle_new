/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      snackbarClasses: "bg-blue-500 text-white"
    },
    fontFamily: {
      'inter': ['Inter', 'sans'],
    },
    fontSize: {
      'h1': '2rem', 
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '1.25rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
    },
    screens: {
      'sm': '640px', // Small screens
      'md': '768px', // Medium screens
      'lg': '1700px', // Large screens
      'xl': '2500px', // Extra-large screens
      '2xl':'3500px',
      '3xl':'4500px',
      
    },
  },
  plugins: [],
}

