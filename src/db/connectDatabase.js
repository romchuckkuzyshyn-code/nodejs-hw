import mongoose from 'mongoose';

const { DB_HOST } = process.env;
const connectDatabase = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('successfully connected database');
  } catch (error) {
    console.log('Failed', error);
    throw error;
  }
};

export default connectDatabase;
