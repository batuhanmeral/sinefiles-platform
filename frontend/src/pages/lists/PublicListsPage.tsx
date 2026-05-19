import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { listsApi } from '@/api/lists.api';
import { PopularListCard } from '@/features/lists/PopularListCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';

export function PublicListsPage() {
  const [limit, setLimit] = useState(20);

  // Popüler listeleri getir
  const { data: lists, isLoading, error } = useQuery({
    queryKey: ['lists', 'popular', limit],
    queryFn: () => listsApi.popular(limit),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Listeler yüklenemedi" />;
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="border-b border-white/10 bg-surface-raised">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h1 className="text-4xl font-bold text-ink">
            🎬 Popüler Listeler
          </h1>
          <p className="mt-2 text-lg text-ink-muted">
            Kullanıcıların oluşturduğu ve beğendiği en iyi film ve dizi listeleri
          </p>
        </div>
      </div>

      {/* İçerik */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {!lists || lists.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 bg-surface-raised p-12 text-center">
            <p className="mb-4 text-lg text-ink-muted">
              Henüz liste yok. İlk listeyi sen oluştur! 🚀
            </p>
            <Link
              to="/dashboard"
              className="inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-surface hover:bg-accent/90 transition-colors"
            >
              Listeye Git
            </Link>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lists.map((list) => (
                <Link
                  key={list.id}
                  to={`/lists/${list.id}`}
                  className="group"
                >
                  <PopularListCard list={list} />
                </Link>
              ))}
            </div>

            {/* Daha Fazla Yükle */}
            {lists.length >= limit && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setLimit((prev) => prev + 20)}
                  className="rounded-lg bg-white/10 px-6 py-3 font-semibold text-ink transition-all hover:bg-white/20"
                >
                  Daha Fazla Yükle
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
