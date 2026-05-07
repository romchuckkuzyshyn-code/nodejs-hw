import Note from '../db/models/note.js';
import createHttpError from 'http-errors';

export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

export const getNoteById = async (req, res) => {
  const { noteId: _id } = req.params;
  const noteById = await Note.findById(_id);
  if (!noteById) {
    throw createHttpError(404, `Note with ${_id} not found`);
  }
  res.json(noteById);
};

export const addNotes = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};

export const updateNoteById = async (req, res) => {
  const { noteId: _id } = req.params;
  const updateNote = await Note.findByIdAndUpdate(_id, req.body, {
    returnDocument: 'after',
  });
  if (!updateNote) {
    throw createHttpError(404, `Note with ${_id} not found`);
  }
  res.json(updateNote);
};

export const deleteNoteById = async (req, res) => {
  const { noteId: _id } = req.params;
  const deleteNote = await Note.findByIdAndDelete(_id);
  if (!deleteNote) {
    throw createHttpError(404, `Note with ${_id} not found`);
  }
  res.json({
    message: 'Delete successfully',
  });
};
