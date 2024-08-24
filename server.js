import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
import { userRoutes, stripeRoutes, chapaRoutes } from './routes/routes.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;
connectDB();
const { json, urlencoded } = express;
const app = express();
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/chapa', chapaRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`running on port ${port}`));