import type { RequestHandler } from 'express';
import * as service from './lists.service.js';
import { UnauthorizedError } from '../../utils/errors.js';
import { validateInput } from '../../middleware/validate.middleware.js';
import { ReorderItemsSchema, GetListDetailSchema } from './lists.validator.js';


export const reorderListItemsHandler: RequestHandler = async (req, res, next) => {
  try {
    if (!req.auth) throw new UnauthorizedError();
    
    const id = req.params.id as string;
    const result = await service.reorderListItems(req.auth.sub, id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};


export const toggleListLikeHandler: RequestHandler = async (req, res, next) => {
  try {
    if (!req.auth) throw new UnauthorizedError();
    
    const id = req.params.id as string;
    const result = await service.toggleListLike(req.auth.sub, id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};


export const getListDetailHandler: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const result = await service.getListDetail(id, req.auth?.sub);
    res.json(result);
  } catch (err) {
    next(err);
  }
};


export const popularListsHandler: RequestHandler = async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit ?? 10), 50);
    const result = await service.listPopularLists(limit, req.auth?.sub);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
