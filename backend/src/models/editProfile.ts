import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';

const profileSchema = new mongoose.Schema({
    gender: String,
    occupation: String,
    favoriteBook: String,
    description: String,
    username: { type: String, unique: true },
  });
  
  export const ProfileModel = mongoose.model('Profile', profileSchema);
  
