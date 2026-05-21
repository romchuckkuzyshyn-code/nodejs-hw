import Note from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    tag,
    search,
    sortBy = '_id',
    sortOrder = 'asc',
  } = req.query;
  const skip = (page - 1) * perPage;
  const notesQuery = Note.find({ userId: req.user._id });
  if (tag) {
    notesQuery.where('tag').equals(tag);
  }
  if (search) {
    notesQuery.where('$text').equals({ $search: search });
  }
  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);
  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page,
    perPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId: _id } = req.params;
  const noteById = await Note.findById({ _id, userId: req.user._id });
  if (!noteById) {
    throw createHttpError(404, `Note with ${_id} not found`);
  }
  res.json(noteById);
};

export const createNote = async (req, res) => {
  const newNote = await Note.createcreate({
    ...req.body,
    userId: req.user._id,
  });
  res.status(201).json(newNote);
};

export const updateNote = async (req, res) => {
  const { noteId: _id } = req.params;
  const updateNote = await Note.findByIdAndUpdate(
    { _id, userId: req.user._id },
    req.body,
    {
      returnDocument: 'after',
    },
  );
  if (!updateNote) {
    throw createHttpError(404, `Note with ${_id} not found`);
  }
  res.json(updateNote);
};

export const deleteNote = async (req, res) => {
  const { noteId: _id } = req.params;
  const deleteNote = await Note.findByIdAndDelete({
    _id,
    userId: req.user._id,
  });
  if (!deleteNote) {
    throw createHttpError(404, `Note with ${_id} not found`);
  }
  res.json(deleteNote);
};
