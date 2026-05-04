import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

const app = express();
const corsMiddleware = cors();
const port = Number(process.env.PORT) || 3000;
const logger = pino({
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: 'HH:MM:ss',
    ignore: 'pid,hostname',
    messageFormat: `{req.method} {req.url} {res.statusCode} - {responseTime}ms`,
    hideObject: true,
  },
});

app.use(express.json());
app.use(corsMiddleware);
app.use(logger);

app.get('/notes', (req, res) => {
  res.json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  res.json({
    message: `Retrieved note with ID: ${req.params.noteId}`,
  });
});

app.get('/test-error', (req, res) => {
  throw new Error('Something went wrong');
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((error, req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const message = isProduction ? 'Some error' : error.message;
  res.status(500).json({
    message,
  });
});

app.listen(port, () => console.log(`server running on ${port} port`));
