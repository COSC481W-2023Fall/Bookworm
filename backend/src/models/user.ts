import bcrypt from 'bcrypt';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose, { Schema, connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL ?? '';

export interface IUser {
  username: string;
  email: string;
  password: string;
  reading_bookshelf: string[];
  completed_bookshelf: string[];
  dropped_bookshelf: string[];
  plan_to_bookshelf: string[];
}

// Define user schema. Email address is the primary, username should be unique too.
const userSchema = new Schema<IUser>({
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

// Create the User model using the defined schema
export const User = mongoose.model('User', userSchema);

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
    const name = user.username;
    const token = jwt.sign({ name }, 'bookwormctrlcsbookwormctrlcs', {
      expiresIn: '1d'
    });

    res.cookie('token', token);
    return res.json({
      success: true,
      message: 'Sign in successfully'
    });
  } catch (error) {
    // TODO: Not sure why this error is logged to console rather than returned to user. Needs testing

    // eslint-disable-next-line no-console
    console.error('Error during authentication:', error);
    return res.json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

/**
 * Define an interface named DecodedToken
 * @interface DecodedToken
 */
export interface DecodedToken {
  name: string;
}

/**
 * Handles the verification of a JWT (JSON Web Token) and responds accordingly.
 * @param token - The JWT to be verified.
 * @param res - The Express response object for sending the verification result.
 * @returns A JSON response indicating the success or failure of the token verification process.
 */
export const handleTokenVerification = (
  token: string | undefined,
  res: Response
) => {
  if (!token) {
    return res.json({ message: 'We need a token, please provide it.' });
  }

  try {
    const decoded = jwt.verify(
      token,
      'bookwormctrlcsbookwormctrlcs'
    ) as DecodedToken;
    return res.json({ success: true, name: decoded.name });
  } catch (err) {
    return res.json({ message: 'Authentication error.' });
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

/**
 * fetches a single user by username
 *
 * @param username the username of a certain user
 * @returns A promise containing a single, potentially-null user document.
 */
export async function fetchUserByUserName(
  username: string
): Promise<IUser | null> {
  await connect(DATABASE_URL);

  const res = await User.findOne({ username });

  return res;
}

/**
 * Add a book to a given users bookshelf of choice
 * @param isbn isbn of a book
 * @param shelf shelf to add book to represented by enumeration
 * @param username username of user adding book to shelf
 * @param res The Express response object for sending the registration result.
 */
export const addBooktoShelf = async (
  isbn: string,
  shelf: string,
  user: string,
  res: Response
) => {
  await connect(DATABASE_URL);

  try {
    // Save to DB
    switch (shelf) {
      case '1':
        await User.updateOne(
          { username: user },
          { $push: { reading_bookshelf: isbn } }
        );
        break;

      case '2':
        await User.updateOne(
          { username: user },
          { $push: { completed_bookshelf: isbn } }
        );
        break;
      case '3':
        await User.updateOne(
          { username: user },
          { $push: { dropped_bookshelf: isbn } }
        );
        break;
      case '4':
        await User.updateOne(
          { username: user },
          { $push: { plan_to_bookshelf: isbn } }
        );
        break;
      default:
        throw Error('invalid book shelf');
    }
  } catch (error) {
    res.status(400).json({ error: 'invalid bookshelf' });
  }
};

/**
 * remove a book to a given users bookshelf of choice
 * @param isbn isbn of a book
 * @param shelf shelf to add book to represented by enumeration
 * @param username username of user adding book to shelf
 * @param res The Express response object for sending the registration result.
 */
export const removeBookFromShelf = async (
  isbn: string,
  shelf: string,
  user: string,
  res: Response
) => {
  await connect(DATABASE_URL);
  try {
    // Save to DB
    switch (shelf) {
      case '1':
        await User.updateOne(
          { username: user },
          { $pull: { reading_bookshelf: isbn } }
        );
        break;
      case '2':
        await User.updateOne(
          { username: user },
          { $pull: { completed_bookshelf: isbn } }
        );
        break;
      case '3':
        await User.updateOne(
          { username: user },
          { $pull: { dropped_bookshelf: isbn } }
        );
        break;
      case '4':
        await User.updateOne(
          { username: user },
          { $pull: { plan_to_bookshelf: isbn } }
        );
        break;
      default:
        throw Error('invallid book shelf');
    }
  } catch (error) {
    res.status(400).json({ error: 'invalid bookshelf' });
  }
};
