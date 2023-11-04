import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import databaseConnection from './databaseConnection';
import {
  authenticateUser,
  registerUser,
  resetPassword,
  verifyJwtToken
} from './models/user';

// load our .env file
import { fetchAllBooks, fetchBookByISBN, fetchBookCount } from './models/book';

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:80',
      'https://capstone.caseycodes.dev'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  })
);

// Connect to mongoDB
databaseConnection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
databaseConnection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Handle registration form submission
app.post('/api/register', async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  // Check input password
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  await registerUser(username, email, password, res);
  return res.status(200);
});

// homepage route
app.get('/api', (req, res) => {
  const { token } = req.cookies;
  const isLogin = verifyJwtToken(token, 'bookwormctrlcsbookwormctrlcs')
  if(isLogin) {
    return res.json({ success: true, name: isLogin  });
  } else {
    return res.json({success: false, message: 'Authentication error.' });
  }
});

// Sign in route
app.post('/api/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body.val;

    await authenticateUser(email, password, res);
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error' });
  }
  return res.status(200);
});

// Sign out route
app.get('/api/sign-out', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true });
});

// Reset Password route
app.post('/api/reset-password', async(req, res) => {
  const password = req.body.val
  const { token } = req.cookies;

  if(!password || !token) {
    res.status(400).json('Missing required paramaters')
  }

  try {
    const isLogin = verifyJwtToken(token, 'bookwormctrlcsbookwormctrlcs');

    if(!isLogin) {
      return res.status(400).json('invalid token');
    }

    const isReset = await resetPassword(password, isLogin)
      if(isReset) {
        return res.status(200).json('Reset successfully')
      }
      else {
        return res.status(400).json('Update unccessfully')
      }
  } catch(error) {
    return res.status(500).json('Internal server error')
  }

  }
);

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

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
