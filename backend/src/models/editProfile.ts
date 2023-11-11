import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  gender: String,
  occupation: String,
  favoriteBook: String,
  description: String,
  username: { type: String, unique: true }
});

const ProfileModel = mongoose.model('Profile', profileSchema);

export default ProfileModel;
