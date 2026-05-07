import mongoose from 'mongoose';

const { MONGO_URL } = process.env;
const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('successfully connected database');
  } catch (error) {
    console.log('Failed', error);
    throw error;
  }
};

export default connectDatabase;
