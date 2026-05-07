import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDatabase from './db/connectDatabase.js';
import logger from './middlewares/logger.js';
import NotFoundHandler from './middlewares/NotFoundHandler.js';
import ErrorHandler from './middlewares/ErrorHandler.js';
import notesRouter from './routes/notesRoutes.js';

const app = express();
const corsMiddleware = cors();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(corsMiddleware);
app.use(logger);
app.use('/notes', notesRouter);

app.use(NotFoundHandler);

app.use(ErrorHandler);

await connectDatabase();

app.listen(port, () => console.log(`server running on ${port} port`));
