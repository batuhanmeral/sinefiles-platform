import { Router } from 'express';

import { popularHandler } from './lists.controller.js';

export const listsRouter = Router();

// Herkese açık popüler listeler
listsRouter.get('/popular', popularHandler);
