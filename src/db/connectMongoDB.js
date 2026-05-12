import mongoose from 'mongoose';
import Note from '../models/note.js';

const { MONGO_URL } = process.env;
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Successfully connected database');
    await Note.syncIndexes();
    console.log('Indexes synced successfully');
  } catch (error) {
    console.log('Failed', error);
    process.exit(1);
  }
};
