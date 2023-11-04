import bcrypt from 'bcrypt';
import { Response } from 'express';
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
 * @param res - The Express response object for sending the authentication result.
 * @returns A JSON response indicating the success or failure of the authentication process.
 */
export const authenticateUser = async (
  email: string,
  password: string,
  res: Response
) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the password matches
    if (!passwordMatch) {
      return res.json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Successful login
    const name = user.username
    const token = jwt.sign({ name }, 'bookwormctrlcsbookwormctrlcs');

    res.cookie('token', token);
    return res.json({
      success: true,
      message: 'Sign in successfully'
    });
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

/**
 * Registers a new user by hashing the password and saving the user to the database.
 * @param username - The username of the new user.
 * @param email - The email of the new user.
 * @param password - The password of the new user.
 * @param res - The Express response object for sending the registration result.
 * @returns A JSON response indicating the success or failure of the registration process.
 */
export const registerUser = async (
  username: string,
  email: string,
  password: string,
  res: Response
) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = new User({ username, email, password: hashedPassword });

  try {
    // Save to DB
    await user.save();
    res.json({ message: 'Registration successful!' });
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Registration failed. User may already exist.' });
  }
};


export const resetPassword = async (
  newPassword: string,
  name: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
      { username: name },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    if(updatedUser) {
      return true;
    }
    return false;
  } catch(error) {
    return false;
  }
}

interface JwtPayload {
  name: string;
}

// Function to verify JWT token and get payload
export const verifyJwtToken = (token:string, secret:string) => {
  try {
    // Verify the token using the provided secret
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // If verification is successful, return the decoded payload
    return decoded.name;
  } catch (error) {
    // If there's an error during verification, return null or handle it as needed
    return null;
  }
};