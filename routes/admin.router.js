import adminRouter from 'admin-bro-expressjs';
import express from 'express';

/**
 * @param {AdminBro} admin
 * @return {express.Router} router
 */
const buildAdminRouter = (admin) => {
    const router = adminRouter.buildRouter(admin);
    return router;
};

export default buildAdminRouter;
