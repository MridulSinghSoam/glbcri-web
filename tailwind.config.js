/** @type {import('tailwindcss').Config} */
// Design tokens taken from the Figma file "GLBCRI-website" (FINAL DESIGN page):
// Inter everywhere, headings weight 800 with tight tracking, ink #242424,
// gold/brown accents on a white page with soft gold glows.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      // Colours sampled from the GLBCRI logo: brown #513529, orange #D98C39, yellow #FAD157.
      colors: {
        ink: { DEFAULT: '#2b1a12', soft: '#5e4a3f', mute: '#7d6a5f' },
        cream: '#fbf7f2',
        gold: {
          50: '#fbf7f2',
          100: '#fbe9c4',
          200: '#f4dca0',
          300: '#fad157', // logo yellow: primary buttons
          400: '#f0b04a',
          500: '#d98c39', // logo orange: accents
          600: '#a8602a',
          700: '#7a4a17', // accessible accent text
          800: '#513529', // logo brown
          900: '#3a241b',
          950: '#2b1a12',
        },
      },
      letterSpacing: { tightest: '-0.04em' },
      boxShadow: {
        card: '0 1px 2px rgba(81,53,41,.05), 0 10px 28px -14px rgba(81,53,41,.18)',
        lift: '0 2px 4px rgba(81,53,41,.06), 0 20px 40px -20px rgba(81,53,41,.45)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        marqueeRev: { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        marqueeRev: 'marqueeRev 40s linear infinite',
      },
    },
  },
  plugins: [],
}
