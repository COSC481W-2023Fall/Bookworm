import mongoose from 'mongoose';

export interface IProfile {
  gender: string;
  occupation: string;
  favoriteBook: string;
  description: string;
  username: string;
}

const profileSchema = new mongoose.Schema<IProfile>({
  gender: String,
  occupation: String,
  favoriteBook: String,
  description: String,
  username: { type: String, unique: true, required: true }
});

const ProfileModel = mongoose.model('Profile', profileSchema);

export default ProfileModel;
