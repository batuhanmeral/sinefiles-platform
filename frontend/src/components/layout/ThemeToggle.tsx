import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/features/theme/themeStore';

// Navbar'daki açık/koyu tema değiştirme butonu.
// Koyu temadayken güneş (açığa geç), açık temadayken ay (koyuya geç) gösterir.
export function ThemeToggle() {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      title={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      className="grid h-9 w-9 place-items-center rounded-full bg-surface-raised text-ink-muted ring-1 ring-white/5 transition-colors hover:text-ink"
    >
      {isDark ? (
        // Güneş ikonu (açık temaya geçiş)
        <svg className="h-4.5 w-4.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        // Ay ikonu (koyu temaya geçiş)
        <svg className="h-4.5 w-4.5" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
