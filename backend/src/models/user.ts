import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

/**
 * Authenticates a user by checking the provided email and password.
 * @param email - The email of the user to authenticate.
 * @param password - The password of the user to authenticate.
 * @returns If user signs in successfully, return username otherwise return null
 */
export const authenticateUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    // Check if the password matches
    if (!passwordMatch) {
      return null;
    }

    // Successful login
    return user.username;
  } catch (error) {
    console.error('Error during authentication:', error);
    return null;
  }
};

/**
 * Registers a new user by hashing the password and saving the user to the database.
 * @param username - The username of the new user.
 * @param email - The email of the new user.
 * @param password - The password of the new user.
 * @returns A JSON response indicating the success or failure of the registration process.
 */
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = new User({ username, email, password: hashedPassword });

  try {
    // Save to DB
    await user.save();
    return true;
  } catch (error) {
    return false;
  }
};

export const resetPassword = async (newPassword: string, name: string) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
      { username: name },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    if (updatedUser) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

interface JwtPayload {
  currentUser: string;
}

// Function to verify JWT token and get payload
export const verifyJwtToken = (token: string, secret: string) => {
  try {
    // Verify the token using the provided secret
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // If verification is successful, return the decoded payload
    return decoded.currentUser;
  } catch (error) {
    // If there's an error during verification, return null or handle it as needed
    return null;
  }
};

export const getUserEmail = async (username: string) => {
  const user = await User.findOne({ username });
  if (user) {
    return user.email;
  }
  return null;
};
