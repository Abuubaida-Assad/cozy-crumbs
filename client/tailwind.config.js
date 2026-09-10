/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cocoa: {
          DEFAULT: '#3A2923',
          dark: '#24130D',
          deep: '#1D0E09',
          light: '#6F5746',
          muted: '#9A8066',
        },
        cream: {
          DEFAULT: '#F8F5EF',
          pure: '#FCFAF7',
          soft: '#FDFBF7',
          beige: '#E9DED1',
          sand: '#EFE7DA',
        },
        accent: {
          DEFAULT: '#B36B39',
          hover: '#985526',
          soft: '#F4E4D7',
          glow: '#C88D67',
        },
        pastel: {
          sand: '#F2E8DC',
          rose: '#FBE8E4',
          sage: '#E5EDE3',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'DM Sans', 'serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(58, 41, 35, 0.05)',
        'soft-md': '0 8px 30px -4px rgba(58, 41, 35, 0.08)',
        'soft-lg': '0 16px 48px -6px rgba(58, 41, 35, 0.12)',
        'hover': '0 20px 40px -4px rgba(58, 41, 35, 0.16)',
        'glow': '0 0 25px rgba(179, 107, 57, 0.25)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
