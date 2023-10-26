import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Define the MongoDB connection URL
dotenv.config();
// const mongodbUri = process.env.MONGODB_URI;
const mongodbUri = process.env.DATABASE_URL ?? '';

if (!mongodbUri) {
  console.error('MongoDB connection URL is missing in the .env file.');
  process.exit(1);
}

mongoose.connect(mongodbUri);

const db = mongoose.connection;

export default db;
