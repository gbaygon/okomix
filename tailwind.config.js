/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './js/**/*.js'],
  safelist: [
    'hover:text-oro-400', 'hover:text-campo-400',
    'text-oro-400', 'text-campo-400',
    'bg-oro-500', 'hover:bg-oro-600',
    'bg-campo-500', 'hover:bg-campo-600',
  ],
  theme: {
    extend: {
      colors: {
        'tierra': { 50: '#faf6f1', 100: '#f0e6d8', 200: '#e0ccb0', 300: '#ccab80', 400: '#b8895a', 500: '#a67542', 600: '#8f5f36', 700: '#74492e', 800: '#5f3c2a', 900: '#503326' },
        'campo': { 50: '#f4f9f4', 100: '#e6f2e6', 200: '#cee5cf', 300: '#a6d0a8', 400: '#76b379', 500: '#539456', 600: '#407943', 700: '#356138', 800: '#2d4e2f', 900: '#264028' },
        'oro': { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f' },
        'mineral': { 50: '#f8f9fa', 100: '#e9ecef', 200: '#dee2e6', 300: '#ced4da', 400: '#adb5bd', 500: '#6c757d', 600: '#495057', 700: '#343a40', 800: '#212529', 900: '#0d1117' }
      },
      fontFamily: {
        'display': ['Bebas Neue', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif']
      }
    }
  }
}
