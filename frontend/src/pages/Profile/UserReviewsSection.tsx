import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { usersApi } from '@/api/users.api';
import { ReviewListItem } from './ReviewListItem';

const PREVIEW_COUNT = 3;

// Profil sayfasında kullanıcının son incelemelerini (ilk 3) gösterir.
// Daha fazlası varsa tüm incelemeler sayfasına yönlendiren bir link sunar.
export function UserReviewsSection({ username }: { username: string }) {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: ['userReviews', username],
    // Daha fazla olup olmadığını anlamak için önizleme sayısından bir fazlasını çek
    queryFn: () => usersApi.reviews(username, PREVIEW_COUNT + 1),
    enabled: Boolean(username),
  });

  if (isLoading) {
    return <div className="card h-40 animate-pulse" />;
  }

  const all = data ?? [];
  const preview = all.slice(0, PREVIEW_COUNT);
  const hasMore = all.length > PREVIEW_COUNT;

  return (
    <section className="card">
      <h2 className="font-display text-lg font-bold text-ink">{t('userReviews.title')}</h2>

      {preview.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">{t('userReviews.empty')}</p>
      ) : (
        <>
          <ul className="mt-4 space-y-4">
            {preview.map((review) => (
              <ReviewListItem key={review.id} review={review} />
            ))}
          </ul>

          {hasMore && (
            <div className="mt-4 text-center">
              <Link to={`/u/${username}/reviews`} className="btn-outline">
                {t('userReviews.showMore')}
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
