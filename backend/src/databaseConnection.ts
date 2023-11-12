import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Define the MongoDB connection URL
dotenv.config();
const mongodbUri = process.env.DATABASE_URL;

/**
 * Connects to MongoDB
 */
export default function connectToDb() {
  if (!mongodbUri) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection URL is missing in the .env file.');
    process.exit(1);
  }

  mongoose.connect(mongodbUri);

  const databaseConnection = mongoose.connection;

  databaseConnection.on('error', (error) => {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', error);
  });

  databaseConnection.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
  });
}
