import type { RequestHandler } from 'express';

import * as service from './lists.service.js';

// Herkese açık popüler listeleri döndürür (limit en fazla 50)
export const popularHandler: RequestHandler = async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit ?? 10), 50);
    const result = await service.listPopularLists(limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
