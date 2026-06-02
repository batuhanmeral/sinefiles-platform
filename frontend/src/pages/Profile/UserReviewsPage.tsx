import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { usersApi } from '@/api/users.api';
import { ReviewListItem } from './ReviewListItem';

// Bir kullanıcının yazdığı tüm incelemeleri gösteren ayrı sayfa.
// Profil sayfasındaki "daha fazla göster" bağlantısıyla açılır.
export default function UserReviewsPage() {
  const { username = '' } = useParams();
  const { t } = useTranslation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userReviews', username, 'all'],
    queryFn: () => usersApi.reviews(username, 50),
    enabled: Boolean(username),
  });

  if (isLoading) {
    return <div className="card h-64 animate-pulse" />;
  }

  if (isError) {
    return <div className="card text-center text-ink-muted">{t('userReviews.empty')}</div>;
  }

  const reviews = data ?? [];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{t('userReviews.allTitle')}</h1>
          <Link to={`/u/${username}`} className="text-sm text-ink-muted hover:text-accent">
            @{username}
          </Link>
        </div>
        <Link to={`/u/${username}`} className="btn-outline px-3 py-1 text-xs">
          {t('userReviews.backToProfile')}
        </Link>
      </header>

      <section className="card">
        {reviews.length === 0 ? (
          <p className="text-sm text-ink-muted">{t('userReviews.empty')}</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <ReviewListItem key={review.id} review={review} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
