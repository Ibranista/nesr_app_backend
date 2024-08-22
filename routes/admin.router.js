import AdminBroexpress from 'admin-bro-expressjs';

/**
 * @param {AdminBro} admin
 */

const buildAdminRouter = (admin) => {
    const router = AdminBroexpress.buildRouter(admin);
    return router;
};

export { buildAdminRouter };