/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    "./index.html", // Include your main HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
  ], // Ensures unused styles are removed
  darkMode: "media", // Enables dark mode based on user system settings
  theme: {
    extend: {}, // Customize your theme here
  },
  variants: {
    extend: {}, // Extend variants for additional utilities
  },
  plugins: [], // Add plugins if needed
};