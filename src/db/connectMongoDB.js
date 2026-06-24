import mongoose from 'mongoose';

const { MONGO_URL } = process.env;
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('successfully connected database');
  } catch (error) {
    console.log('Failed', error);
    process.exit(1);
  }
};
