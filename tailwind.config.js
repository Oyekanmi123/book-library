/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        sm: "480px",  // Small devices
        md: "768px",  // Tablets
        lg: "1024px", // Laptops
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),
            require('tailwind-scrollbar-hide'), // Add the scrollbar hide plugin here
  ],
  
}

