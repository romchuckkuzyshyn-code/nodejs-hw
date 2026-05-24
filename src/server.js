import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';
import dns from 'dns';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const corsMiddleware = cors();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());
app.use(logger);
app.use('/auth', authRoutes);
app.use('/notes', notesRouter);
app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => console.log(`server running on ${port} port`));
