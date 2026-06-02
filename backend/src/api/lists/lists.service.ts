import { prisma } from '../../config/db.js';

// Herkese açık popüler listeleri beğeni sayısına (eşitlikte en yeniye) göre döndürür.
// Her liste için kart önizlemesi: ilk 4 öğenin poster yolları ve beğeni/öğe sayıları.
export async function listPopularLists(limit: number) {
  const lists = await prisma.list.findMany({
    where: { visibility: 'PUBLIC' },
    orderBy: [{ likes: { _count: 'desc' } }, { createdAt: 'desc' }],
    take: limit,
    include: {
      user: {
        select: { id: true, username: true, displayName: true, avatarUrl: true },
      },
      _count: { select: { likes: true, items: true } },
      items: {
        orderBy: { position: 'asc' },
        take: 4,
        select: {
          content: { select: { id: true, posterPath: true, title: true } },
        },
      },
    },
  });

  return lists.map((l) => ({
    id: l.id,
    title: l.title,
    description: l.description,
    type: l.type,
    coverImage: l.coverImage,
    createdAt: l.createdAt,
    user: l.user,
    likeCount: l._count.likes,
    itemCount: l._count.items,
    previewPosters: l.items
      .map((it) => it.content.posterPath)
      .filter((p): p is string => Boolean(p)),
  }));
}
