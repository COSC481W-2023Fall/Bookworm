import mongoose, { Schema } from 'mongoose';

// Define user schema. Email address is the primary, username should be unique too.
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    primary: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create the User model using the defined schema
const User = mongoose.model('User', userSchema);

export default User;
