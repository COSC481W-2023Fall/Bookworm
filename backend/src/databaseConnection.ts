import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Define the MongoDB connection URL
dotenv.config();
const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  console.error('MongoDB connection URL is missing in the .env file.');
  process.exit(1);
}

mongoose.connect(mongodbUri);

const databaseConnection = mongoose.connection;

export default databaseConnection;