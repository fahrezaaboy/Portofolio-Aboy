export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#171717',
        'surface-elevated': '#1f1f1f',
        foreground: '#bebab7',
        muted: '#8d8985',
        primary: '#dbcc47',
        secondary: '#f65f4e',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"Big Shoulders Display"', '"Space Grotesk"', 'sans-serif'],
        kicker: ['"Six Caps"', '"Big Shoulders Display"', 'sans-serif'],
        heading: ['"Oi"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
