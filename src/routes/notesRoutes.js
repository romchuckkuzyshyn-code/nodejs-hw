import { Router } from 'express';
import {
  addNotes,
  getNoteById,
  getNotes,
  updateNoteById,
  deleteNoteById,
} from '../controllers/notesController.js';

const notesRouter = Router();

notesRouter.get('/', getNotes);

notesRouter.get('/:noteId', getNoteById);

notesRouter.post('/', addNotes);

notesRouter.patch('/:noteId', updateNoteById);

notesRouter.delete('/:noteId', deleteNoteById);

export default notesRouter;
