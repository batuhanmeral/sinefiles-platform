import { Router } from 'express';
import * as c from './admin.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

export const adminRouter = Router();

// requireAuth eklendi: withAdminAuth req.auth'a bakıyor, onu da requireAuth doldurur
adminRouter.use(requireAuth, c.withAdminAuth);

adminRouter.get('/dashboard', c.dashboard);
adminRouter.get('/users', c.users);
adminRouter.delete('/users/:id', c.deleteUser);
adminRouter.patch('/users/:id/role', c.updateRole);
adminRouter.get('/content', c.content);
adminRouter.delete('/content/:id', c.deleteContentItem);
