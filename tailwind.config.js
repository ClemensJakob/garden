/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px',
    },
    fontSize: {
      xs: ['0.5rem', { lineHeight: '0.75rem' }],       // 8px
      sm: ['0.625rem', { lineHeight: '0.875rem' }],    // 10px
      base: ['0.75rem', { lineHeight: '1rem' }],       // 12px
      lg: ['0.875rem', { lineHeight: '1.25rem' }],     // 14px
      xl: ['1rem', { lineHeight: '1.5rem' }],          // 16px
      '2xl': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
      '3xl': ['1.375rem', { lineHeight: '2rem' }],     // 22px
      '4xl': ['1.75rem', { lineHeight: '2.25rem' }],   // 28px
      '5xl': ['2.25rem', { lineHeight: '1' }],         // 36px
      '6xl': ['3rem', { lineHeight: '1' }],            // 48px
      '7xl': ['3.75rem', { lineHeight: '1' }],         // 60px
      '8xl': ['5rem', { lineHeight: '1' }],            // 80px
      '9xl': ['6.75rem', { lineHeight: '1' }],         // 108px
    },
    extend: {
      colors: {
        // Garden background — soft sage green
        garden: {
          bg: '#d4e6c3',        // soft green lawn
          path: '#c8b99a',      // sandy path between beds
        },
        // Patch (Beet) — warm earthy tones
        patch: {
          DEFAULT: '#e8d5b0',   // light warm brown / sandy soil
          border: '#c4a97a',    // medium brown border
          text: '#4a3728',      // dark brown text
          hover: '#dfc89a',     // slightly darker on hover
        },
        // Kompost — dark rich earth
        kompost: {
          bg: '#2d1f0e',
          border: '#1a1108',
          text: '#f5e6c8',
        },
        // Kräuter — soft herb green
        kraeuter: {
          bg: '#e8f5e0',
          border: '#7db87a',
          text: '#2d5a27',
        },
        // Beere — muted berry purple
        beere: {
          bg: '#e8d5e8',
          border: '#9b6b9b',
          text: '#4a1f4a',
        },
        // Storage units (Schuppen, Kiste) — weathered wood
        storage: {
          bg: '#c9b08a',
          border: '#a08060',
          text: '#3d2b1a',
        },
      },
      // Tailwind's default `grid-row-start` utilities only go up to
      // `row-start-7`, and `row-span` only up to `row-span-6`.
      // The garden layout uses a 22-row grid, so we extend both
      // scales here to cover all indices used in GardenLayout.
      gridRowStart: {
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19',
        20: '20',
        21: '21',
        22: '22',
        23: '23',
      },
      gridRow: {
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-10': 'span 10 / span 10',
        'span-11': 'span 11 / span 11',
        'span-12': 'span 12 / span 12',
      },
    },
  },
  plugins: [],
}
