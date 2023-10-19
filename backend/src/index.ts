import express, { Request, Response } from 'express';
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import jwt, { VerifyErrors } from 'jsonwebtoken';
// import db from './config/db';
// import User from './models/user.js'
// load our .env file
import { fetchAllBooks, fetchBookByISBN, fetchBookCount } from './models/book';

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Connect to MongoDB
// db();

// Define the MongoDB connection URL
const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  console.error('MongoDB connection URL is missing in the .env file.');
  process.exit(1);
}

mongoose.connect(mongodbUri);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Define user model. Email address is the primary, username should be unique too.
interface IUser {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema<IUser & Document> = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

const User: Model<IUser & Document> = mongoose.model<IUser & Document>('User', userSchema);

export default User;

// Handle registration form submission
app.post('/register', async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check input password
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  // Password hashing and salting, use bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const user = new User({ username, email, password: hashedPassword });

  try {
    // Save to DB
    await user.save();
    res.json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed. User may already exist.' });
  }
});


// Define an interface named DecodedToken
interface DecodedToken {
  name: string;
  iat: number;
  exp: number;
}

// homepage route
app.get('/', (req, res) => {
  const token = req.cookies.token
  if(!token) {
      return res.json({message: 'we need token please provide it'})
  } else {
      try {
          const decoded = jwt.verify(token, 'bookwormctrlcsbookwormctrlcs')as DecodedToken;
          res.json({success: true, name: decoded.name})
        } catch(err) {
          return res.json({message: 'Authentication error.'})
        }
  }      
});

// Sign in route
app.post('/sign-in', async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find the user in the database
      const user = await User.findOne({ email });

      if (!user) {
          return res.json({ success: false, message: 'User not found' });
      }

      // password hashing and salting, use bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Check if the password matches
      if (user.password!== password) {
          return res.json({ success: false, message: 'Invalid password' });
      }

      // Successful login   
      const name = user.username
      const token = jwt.sign({name},'bookwormctrlcsbookwormctrlcs', {expiresIn:'1d'})
      res.cookie('token', token)
      // console.log(token)
      // console.log(name)
      return res.json({success: true, message: 'sign in sucessfully'})
      
  } catch (error) {
      console.error('Error during login:', error);
      res.json({ success: false, message: 'Internal server error' });
  }
});

// Sign out route
app.get('/sign-out', (req, res) => {
  const token = req.cookies.token
  res.clearCookie('token')
  return res.json({success: true})
})

// API routes for books
app.get('/api/ping', (_, res) => {
  res.status(200).send('Pong!');
});


app.get('/api/books', async (req: Request, res: Response) => {
  const offset = parseInt((req.query.offset || '') as string, 10);
  const limit = parseInt((req.query.limit || '') as string, 10);

  if (isNaN(offset) || offset < 0) {
    return res.status(400).send('Offset must be a non-negative number');
  }

  if (isNaN(limit) || limit <= 0) {
    return res.status(400).send('Limit must be a number greater than zero');
  }

  try {
    const books = await fetchAllBooks(offset, limit);
    if (!books) {
      return res.sendStatus(400);
    }
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/books/total', async (_, res: Response) => {
  try {
    const count = await fetchBookCount();
    return res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/books/:isbn', async (req: Request<{ isbn: string }, {}, {}>, res: Response) => {
  const { isbn } = req.params;

  try {
    const book = await fetchBookByISBN(isbn);
    if (!book) {
      return res.status(404).send(`No book found with ISBN ${isbn}`);
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

