import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import {
  authenticateUser,
  handleTokenVerification,
  registerUser
} from './models/user';

import {
  Book,
  IReview,
  Ibook,
  fetchAllBooks,
  fetchBookCount
} from './models/book';
import connectToDb from './databaseConnection';
import { checkBookISBN, checkReviewAuthor, checkReviewID, requireLogin } from './middleware';

// load our .env file
dotenv.config();
const PORT = process.env.PORT || 3001;

connectToDb();

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
  handleTokenVerification(token, res);
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

app.get('/api/books/:isbn', checkBookISBN, async (_: Request, res: Response) =>
  res.status(200).json(res.locals.book)
);

app
  .route('/api/books/:isbn/reviews')
  .all(checkBookISBN)

  // return all reviews
  .get(async (_, res) => res.status(200).json(res.locals.book.reviews))

  // create a new review
  // TODO: Unimplemented
  .post(async (req, res) => res.status(201));

app
  .route('/api/books/:isbn/reviews/:reviewId')
  .all(checkBookISBN)
  .all(checkReviewID)
  .all(requireLogin)

  // return a single review
  // TODO: Unimplemented
  .get(async (_, res) => {
    return res.status(200).json(res.locals.review)
  })

  // edit an existing review
  // TODO: Unimplemented
  .put(checkReviewAuthor, async (_, res) => res.status(200))

  // delete an existing reivew
  // TODO: Unimplemented
  .delete(checkReviewAuthor, async (_, res) => {
    const book = res.locals.book as Ibook;
    const review = res.locals.review as IReview;

    // TODO: Surely there's a cleaner way of doing this?
    try {
      const newReviews = book.reviews.filter(r => r._id != review._id);
      await Book.findOneAndUpdate({ isbn: book.isbn }, { reviews: newReviews });

      return res.status(204);
    }
    catch (error) {
      return res.status(500);
    }
  });

// Start the server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
