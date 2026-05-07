import { Router } from 'express';
import { getNoteById, getNotes } from '../controllers/noteControllers.js';

const notesRouter = Router();

notesRouter.get('/', getNotes);

notesRouter.get('/:noteId', getNoteById);

export default notesRouter;
