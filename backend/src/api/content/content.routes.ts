import { Router } from 'express';

import { validate } from '../../middleware/validate.middleware.js';
import {
  detailHandler,
  discoverHandler,
  genresHandler,
  personHandler,
  personSearchHandler,
  popularHandler,
  searchHandler,
  trendingHandler,
  upcomingHandler,
} from './content.controller.js';
import {
  detailParamsSchema,
  detailQuerySchema,
  discoverSchema,
  genresSchema,
  personParamsSchema,
  personQuerySchema,
  personSearchSchema,
  popularSchema,
  searchSchema,
  trendingSchema,
  upcomingSchema,
} from './content.validator.js';

export const contentRouter = Router();

contentRouter.get('/search', validate(searchSchema, 'query'), searchHandler);
contentRouter.get('/trending', validate(trendingSchema, 'query'), trendingHandler);
contentRouter.get('/popular', validate(popularSchema, 'query'), popularHandler);
contentRouter.get('/upcoming', validate(upcomingSchema, 'query'), upcomingHandler);
contentRouter.get('/discover', validate(discoverSchema, 'query'), discoverHandler);
contentRouter.get('/genres', validate(genresSchema, 'query'), genresHandler);
// Not: bu rotalar /:type/:tmdbId'den ÖNCE tanımlanmalı, aksi halde "person" bir tür
// (type) olarak yakalanır. Ayrıca /person/search, /person/:personId'den önce gelmeli.
contentRouter.get('/person/search', validate(personSearchSchema, 'query'), personSearchHandler);
contentRouter.get(
  '/person/:personId',
  validate(personParamsSchema, 'params'),
  validate(personQuerySchema, 'query'),
  personHandler,
);
contentRouter.get(
  '/:type/:tmdbId',
  validate(detailParamsSchema, 'params'),
  validate(detailQuerySchema, 'query'),
  detailHandler,
);
