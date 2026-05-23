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
        // Garden background — lush "Es-Day" / Stardew grass.
        // Saturation lifted vs. the earlier sage so beds clearly read as
        // "soil sitting on a lawn" rather than two muted greens stacked.
        garden: {
          bg: '#9fc97a',        // vivid lawn green
          path: '#c8b99a',      // sandy path between beds
        },
        // Patch (Beet) — warm earthy tones, richer than before so the
        // soil pops against the lawn.
        patch: {
          DEFAULT: '#d9b079',   // tilled soil, mid-tone
          border: '#8a5a32',    // dark soil border (furrow)
          text: '#3a2814',      // dark brown text
          hover: '#cfa468',     // slightly darker on hover
        },
        // Kompost — dark rich earth (unchanged, already strong contrast)
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
        // Beere — raspberry pink/red, named after the lead crop
        // (Himbeeren). Earlier purple read as lavender / herb.
        beere: {
          bg: '#f4c2cc',        // soft raspberry blush
          border: '#c2185b',    // deep raspberry
          text: '#5a0a25',      // dark berry juice
        },
        // Storage units — split into two distinct materials so Kiste
        // (metal/stone tool box) and Schuppen (wooden shed) read at a
        // glance instead of looking like the same brown rectangle.
        storage: {
          // Kiste — cool grey, like a galvanised metal crate.
          kiste: {
            bg: '#b8b8b8',
            border: '#7a7a7a',
            text: '#2a2a2a',
          },
          // Schuppen — warm weathered wood planks.
          schuppen: {
            bg: '#b08355',
            border: '#6b4423',
            text: '#2a1a08',
          },
        },
        // Plant accent palette — each AccentColor token maps to a soft
        // tint (used as patch background overlay) and a deeper shade
        // (used for the patch border / icon halo). Kept muted so the
        // garden still reads as warm soil, not a candy box.
        accent: {
          tomato:     { bg: '#f4d4cc', border: '#c97a64' },
          pumpkin:    { bg: '#f4dcb6', border: '#d49250' },
          leaf:       { bg: '#d8e8c4', border: '#7da653' },
          pea:        { bg: '#dfecc4', border: '#9bb35a' },
          carrot:     { bg: '#f5dab2', border: '#d6904a' },
          beet:       { bg: '#e6c8d4', border: '#a85e7a' },
          onion:      { bg: '#e6dfd0', border: '#9c8f6e' },
          lettuce:    { bg: '#e3ebbf', border: '#a3b85a' },
          strawberry: { bg: '#f4cdd5', border: '#c87189' },
          rhubarb:    { bg: '#eecdcd', border: '#bb6a72' },
          bloom:      { bg: '#eed1e1', border: '#b277a0' },
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
