import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    primary: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  reading_bookshelf: {
    type: [String],
    required: false
  },
  completed_bookshelf: {
    type: [String],
    required: false
  },
  dropped_bookshelf: {
    type: [String],
    required: false
  },
  plan_to_bookshelf: {
    type: [String],
    required: false
  }
});

const User = mongoose.model('User', userSchema);

export default User;
