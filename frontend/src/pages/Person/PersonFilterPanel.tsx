import { useTranslation } from 'react-i18next';
import type { Genre } from '@/types/content';

// Oyuncu filmografisi için tür filtresi: hepsi, film veya dizi
export type PersonTypeFilter = 'all' | 'movie' | 'tv';

// Sıralama seçenekleri
export type PersonSort = 'popularity' | 'releaseDate' | 'rating' | 'name';

// Oyuncu sayfası filtre/sıralama değerleri (tümü ön yüzde uygulanır)
export interface PersonFilterValues {
  type: PersonTypeFilter;
  year?: number;
  genre?: number;
  minRating?: number;
  sort: PersonSort;
}

interface Props {
  values: PersonFilterValues;
  onChange: (next: PersonFilterValues) => void;
  // Yalnızca bu oyuncunun yapımlarında geçen türler gösterilir
  genres: Genre[];
  // Yalnızca bu oyuncunun yapımlarında geçen yıllar (azalan) gösterilir
  years: number[];
}

// Oyuncu sayfasının sol panelindeki filtreleme/sıralama bileşeni.
// Discover'daki FilterPanel ile aynı görsel dili kullanır, ancak tüm filtreleme
// client-side yapıldığı için değerler doğrudan üst bileşende tutulur.
export function PersonFilterPanel({ values, onChange, genres, years }: Props) {
  const { t } = useTranslation();
  const set = <K extends keyof PersonFilterValues>(k: K, v: PersonFilterValues[K]) =>
    onChange({ ...values, [k]: v });

  return (
    <aside className="card sticky top-20 space-y-5 self-start">
      <div>
        <h3 className="text-base font-semibold text-ink">{t('discover.filters.title')}</h3>
        <p className="mt-1 text-xs text-ink-muted">{t('discover.filters.subtitle')}</p>
      </div>

      {/* Tür: Hepsi / Film / Dizi */}
      <Field label={t('discover.filters.type')}>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-surface p-1 ring-1 ring-white/5">
          {(['all', 'movie', 'tv'] as const).map((tt) => (
            <button
              key={tt}
              type="button"
              onClick={() => set('type', tt)}
              className={
                'rounded-md px-2 py-1.5 text-sm font-semibold transition-colors ' +
                (values.type === tt ? 'bg-accent text-surface' : 'text-ink-muted hover:text-ink')
              }
            >
              {tt === 'all'
                ? t('person.all')
                : tt === 'movie'
                  ? t('discover.filters.movies')
                  : t('discover.filters.shows')}
            </button>
          ))}
        </div>
      </Field>

      {/* Sıralama */}
      <Field label={t('discover.filters.sortBy')}>
        <select
          className="input"
          value={values.sort}
          onChange={(e) => set('sort', e.target.value as PersonSort)}
        >
          <option value="popularity">{t('discover.filters.sortPopularity')}</option>
          <option value="releaseDate">{t('discover.filters.sortRecent')}</option>
          <option value="rating">{t('discover.filters.sortRating')}</option>
          <option value="name">{t('person.sortName')}</option>
        </select>
      </Field>

      {/* Yıl */}
      <Field label={t('discover.filters.year')}>
        <select
          className="input"
          value={values.year ?? ''}
          onChange={(e) => set('year', e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">{t('discover.filters.any')}</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </Field>

      {/* Kategori (genre) */}
      <Field label={t('discover.filters.genre')}>
        <select
          className="input"
          value={values.genre ?? ''}
          onChange={(e) => set('genre', e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">{t('discover.filters.any')}</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </Field>

      {/* Min. TMDB puanı */}
      <Field label={`${t('discover.filters.minRating')} ${values.minRating ?? '–'}`}>
        <input
          type="range"
          min="0"
          max="9"
          step="1"
          value={values.minRating ?? 0}
          onChange={(e) =>
            set('minRating', Number(e.target.value) === 0 ? undefined : Number(e.target.value))
          }
          className="w-full accent-accent"
        />
      </Field>

      {/* Sıfırla */}
      <button
        type="button"
        onClick={() => onChange({ type: 'all', sort: 'popularity' })}
        className="btn-ghost w-full"
      >
        {t('discover.filters.reset')}
      </button>
    </aside>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
