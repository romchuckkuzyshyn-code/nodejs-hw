import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';
import dns from 'dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);

const app = express();
const corsMiddleware = cors();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(corsMiddleware);
app.use(logger);
app.use('/notes', notesRouter);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => console.log(`server running on ${port} port`));
