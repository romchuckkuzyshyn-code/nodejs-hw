import Note from '../db/models/Notes.js';
import createHttpError from 'http-errors';

export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

export const getNoteById = async (req, res) => {
  const { id } = req.params.noteId;
  const noteById = await Note.findById(id);
  if (!noteById) {
    throw createHttpError(404, `Note with ${id} not found`);
  }
  res.json(noteById);
};
