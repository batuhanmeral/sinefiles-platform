import type { Config } from 'tailwindcss';

// Tailwind CSS tema yapılandırması
// Uygulamanın renk paleti, yazı tipleri, gölgeler ve animasyonları tanımlar
export default {
  // Tailwind sınıflarının taranacağı dosyalar
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // Dark mode'u CSS sınıfıyla etkinleştir (<html class="dark">)
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Renkler CSS değişkenlerinden gelir (bkz. tailwind.css :root / html.light)
        // Böylece açık/koyu tema arasında geçiş yapılabilir; alpha modifier'lar korunur.
        // %60 — Ana arka plan
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          // %30 — İkincil arka plan (kartlar, navbar, inceleme konteynerleri)
          raised: 'rgb(var(--color-surface-raised) / <alpha-value>)',
          muted: 'rgb(var(--color-surface-muted) / <alpha-value>)',
          ring: 'rgb(var(--color-surface-ring) / <alpha-value>)',
        },
        // %10 — Vurgu rengi (butonlar, aktif durumlar, önemli vurgular)
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          cyan: 'rgb(var(--color-accent-cyan) / <alpha-value>)',
          600: 'rgb(var(--color-accent-600) / <alpha-value>)',
          700: 'rgb(var(--color-accent-700) / <alpha-value>)',
        },
        // Metin renkleri
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          muted: 'rgb(var(--color-ink-muted) / <alpha-value>)',
          dim: 'rgb(var(--color-ink-dim) / <alpha-value>)',
        },
        // Puan bazlı renk kodlaması
        rating: {
          low: 'rgb(var(--color-rating-low) / <alpha-value>)',
          mid: 'rgb(var(--color-rating-mid) / <alpha-value>)',
          high: 'rgb(var(--color-rating-high) / <alpha-value>)',
        },
      },
      // Yazı tipi aileleri
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      // Özel gölge tanımları
      boxShadow: {
        glow: '0 10px 40px -10px rgba(16, 185, 129, 0.45)',          // Yeşil parlama
        'glow-cyan': '0 10px 40px -10px rgba(6, 182, 212, 0.45)',    // Cyan parlama
        card: '0 16px 40px -16px rgba(0, 0, 0, 0.85)',               // Kart gölgesi (daha derin)
      },
      backdropBlur: {
        xs: '2px',
      },
      // Özel geçiş zamanlama fonksiyonu (spring animasyonu)
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      // Özel animasyonlar
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'lift-in': 'liftIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      // Animasyon keyframe tanımları
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        liftIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
