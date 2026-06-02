import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { poster } from '@/lib/tmdb';
import { RatingStars } from '@/components/content/RatingStars';
import type { PopularReview } from '@/api/reviews.api';

// Profil ve "tüm incelemeler" sayfasında ortak kullanılan tek bir inceleme satırı.
// İçerik posteri + başlık + puan + inceleme metni + beğeni/yorum sayısını gösterir.
export function ReviewListItem({ review }: { review: PopularReview }) {
  const { t } = useTranslation();
  const posterUrl = poster(review.content.posterPath, 'w185');
  const detailHref = `/${review.content.type === 'MOVIE' ? 'movie' : 'tv'}/${review.content.tmdbId}`;
  const year = review.content.releaseDate
    ? new Date(review.content.releaseDate).getFullYear()
    : null;

  return (
    <li className="flex gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
      {/* İçerik posteri */}
      <Link to={detailHref} className="shrink-0">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={review.content.title}
            className="h-24 w-16 rounded-md object-cover ring-1 ring-white/10"
            loading="lazy"
          />
        ) : (
          <div className="h-24 w-16 rounded-md bg-surface-muted ring-1 ring-white/10" />
        )}
      </Link>

      {/* İnceleme içeriği */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link to={detailHref} className="truncate font-semibold text-ink hover:text-accent">
            {review.content.title}
          </Link>
          {year && <span className="text-xs text-ink-muted">{year}</span>}
          <RatingStars value={review.rating} size="sm" showValue />
        </div>

        {review.body && (
          <p className="mt-2 text-sm leading-relaxed text-ink/90 line-clamp-4">
            {review.containsSpoiler ? t('userReviews.spoiler') : review.body}
          </p>
        )}

        <footer className="mt-2 flex items-center gap-3 text-xs text-ink-muted">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
            </svg>
            {review.likeCount}
          </span>
          <span>💬 {review.commentCount}</span>
        </footer>
      </div>
    </li>
  );
}
