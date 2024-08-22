import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { userRoutes } from './routes/routes.js';
import { options } from './admin.options.js';
import buildAdminRouter from './admin.router.js';
import express from 'express';
import AdminBro from 'admin-bro';

import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

const { json, urlencoded } = express;

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// // const loggerMiddleware = (req, res, next) => {
// //     console.log(`Logged: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
// //     next();
// // };


app.use('/api/users', userRoutes);
// app.use(loggerMiddleware);


app.get('/', (req, res) => {
    res.send('Hello World');
});



const run = async () => {
    const admin = new AdminBro(options);
    const router = buildAdminRouter(admin);
    app.use(admin.options.rootPath, router);
    app.listen(port, () => console.log(`running on port ${port}`));
};

run();

app.use(notFound);
app.use(errorHandler);