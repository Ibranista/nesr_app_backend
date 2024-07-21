import express from 'express';
import dotenv from 'dotenv';
import { userRoutes } from './routes/routes.js';
import connectDB from './config/db.js';

dotenv.config();

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;

connectDB();
const app = express();

// const loggerMiddleware = (req, res, next) => {
//     console.log(`Logged: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// };


app.use('/api/users', userRoutes);
// app.use(loggerMiddleware);


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`running on port ${port}`));