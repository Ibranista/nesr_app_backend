import { errorHandler, notFound } from "../middleware/errorMiddleware.js";
import userRoutes from "../routes/auth.route.js";

export const run = async (app) => {
    app.use('/api/users', userRoutes);


    app.get('/', (req, res) => {
        res.send('Help The Poor!');
    });

    app.use(notFound);
    app.use(errorHandler);

    app.listen(port, () => console.log(`running on port ${port}`));
};
