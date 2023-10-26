import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from './models/dbConnection';
import User from './models/user';
// load our .env file
import { fetchAllBooks, fetchBookByISBN, fetchBookCount } from './models/book';

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  })
);

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

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
    return res.json({ message: 'Registration successful!' });
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Registration failed. User may already exist.' });
  }
});

// Define an interface named DecodedToken
interface DecodedToken {
  name: string;
  iat: number;
  exp: number;
}

// homepage route
app.get('/api', (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ message: 'we need token please provide it' });
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
});

// Sign in route
app.post('/api/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body.val;
    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the password matches
    if (!passwordMatch) {
      return res.json({ success: false, message: 'Invalid password' });
    }

    // Successful login
    const name = user.username;
    const token = jwt.sign({ name }, 'bookwormctrlcsbookwormctrlcs', {
      expiresIn: '1d'
    });
    res.cookie('token', token);
    return res.json({ success: true, message: 'sign in sucessfully' });
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error' });
  }
});

// Sign out route
app.get('/api/sign-out', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true });
});

// API routes for books
app.get('/api/ping', (_, res) => {
  res.status(200).send('Pong!');
});

app.get('/api/books', async (req: Request, res: Response) => {
  const offset = parseInt((req.query.offset || '') as string, 10);
  const limit = parseInt((req.query.limit || '') as string, 10);

  if (Number.isNaN(offset) || offset < 0) {
    return res.status(400).send('Offset must be a non-negative number');
  }

  if (Number.isNaN(limit) || limit <= 0) {
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

app.get(
  '/api/books/:isbn',
  async (req: Request<{ isbn: string }, object, object>, res: Response) => {
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
  }
);

// app.get('/api/:bookId', (req, res) => {
//   const { bookId } = req.params;

// });

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
