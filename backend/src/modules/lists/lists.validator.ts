import { z } from 'zod';


export const ReorderItemsSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().uuid('Geçerli UUID gerekli'),
        position: z.number().int().min(0, 'Position 0 veya daha büyük olmalı'),
      })
    )
    .min(1, 'En az bir item gerekli'),
});

export type ReorderItemsInput = z.infer<typeof ReorderItemsSchema>;


export const ListDetailResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  type: z.enum(['WATCHED', 'WATCHLIST', 'FAVORITES', 'CUSTOM']),
  visibility: z.enum(['PUBLIC', 'PRIVATE']),
  coverImage: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.object({
    id: z.string().uuid(),
    username: z.string(),
    displayName: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    bio: z.string().nullable(),
    location: z.string().nullable(),
    createdAt: z.date(),
  }),
  items: z.array(
    z.object({
      id: z.string().uuid(),
      contentId: z.string().uuid(),
      position: z.number().int(),
      note: z.string().nullable(),
      addedAt: z.date(),
      content: z.object({
        id: z.string().uuid(),
        title: z.string(),
        posterPath: z.string().nullable(),
        tmdbId: z.number().int(),
        type: z.enum(['MOVIE', 'TV']),
        releaseDate: z.date().nullable(),
        overview: z.string().nullable(),
      }),
    })
  ),
  likeCount: z.number().int().nonnegative(),
  likedByMe: z.boolean(),
  isOwner: z.boolean(),
});

export type ListDetailResponse = z.infer<typeof ListDetailResponseSchema>;


export const GetListDetailSchema = z.object({
  id: z.string().uuid('Geçerli liste ID gerekli'),
});

export type GetListDetailInput = z.infer<typeof GetListDetailSchema>;


export const ToggleLikeResponseSchema = z.object({
  liked: z.boolean(),
  likeCount: z.number().int().nonnegative(),
});

export type ToggleLikeResponse = z.infer<typeof ToggleLikeResponseSchema>;


export const PopularListsQuerySchema = z.object({
  limit: z
    .string()
    .transform((v) => parseInt(v, 10))
    .refine((v) => !isNaN(v) && v > 0, { message: 'Limit pozitif sayı olmalı' })
    .optional()
    .default('10'),
});

export type PopularListsQuery = z.infer<typeof PopularListsQuerySchema>;
