/** Colours/fonts map to CSS variables defined in src/styles/index.css so the whole brand can be re-themed in one place. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: 'rgb(var(--c-ivory) / <alpha-value>)',
        sand: 'rgb(var(--c-sand) / <alpha-value>)',
        taupe: 'rgb(var(--c-taupe) / <alpha-value>)',
        bronze: 'rgb(var(--c-bronze) / <alpha-value>)',
        'bronze-dark': 'rgb(var(--c-bronze-dark) / <alpha-value>)',
        charcoal: 'rgb(var(--c-charcoal) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: { soft: 'var(--shadow-soft)', lift: 'var(--shadow-lift)' },
    },
  },
  plugins: [],
};
