import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ProfileModel from './models/editProfile';
import {
  IUser,
  addBooktoShelf,
  authenticateUser,
  fetchBookShelf,
  fetchUserByUserName,
  getUserEmail,
  registerUser,
  resetPassword,
  verifyJwtToken
} from './models/user';

// load our .env file
import connectToDb from './databaseConnection';
import {
  checkBookISBN,
  checkContent,
  checkIfBookInShelf,
  checkReviewAuthor,
  checkReviewUsername,
  requireLogin
} from './middleware';
import {
  Book,
  IReview,
  Ibook,
  fetchAllBooks,
  fetchBookCount,
  searchBooks,
  searchCount
} from './models/book';

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

  const isRegister = await registerUser(username, email, password);
  if (isRegister) {
    return res.status(200).json({ message: 'Registration successful!' });
  }
  return res
    .status(400)
    .json({ error: 'Registration failed. User may already exist.' });
});

// homepage route
app.get('/api', (req, res) => {
  const { token } = req.cookies;
  const isLogin = verifyJwtToken(token, 'bookwormctrlcsbookwormctrlcs');
  if (isLogin) {
    return res.json({ success: true, name: isLogin });
  }
  return res.json({ success: false, message: 'Authentication error.' });
});

// Sign in route
app.post('/api/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body.val;
    const currentUser = await authenticateUser(email, password);
    if (currentUser) {
      // Successful login
      const token = jwt.sign({ currentUser }, 'bookwormctrlcsbookwormctrlcs');
      res.cookie('token', token);
      return res.status(200).json({
        success: true,
        message: 'Sign in successfully'
      });
    }
    return res.status(200).json({
      success: false,
      message: 'Password or Email incorrect'
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: 'Internal server error' });
  }
  return res.status(200);
});

// Sign out route
app.get('/api/sign-out', (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ success: true });
});

// Reset Password route
app.post('/api/reset-password', async (req, res) => {
  const password = req.body.val;
  const { token } = req.cookies;

  if (!password || !token) {
    res.status(400).json('Missing required paramaters');
  }

  try {
    const isLogin = verifyJwtToken(token, 'bookwormctrlcsbookwormctrlcs');

    if (!isLogin) {
      return res.status(400).json('invalid token');
    }

    const isReset = await resetPassword(password, isLogin);
    if (isReset) {
      return res.status(200).json('Reset successfully');
    }
    return res.status(400).json('Update unccessfully');
  } catch (error) {
    return res.status(500).json('Internal server error');
  }
});

// get user email
app.get('/api/get-user-email', async (req, res) => {
  const { token } = req.cookies;
  const isLogin = verifyJwtToken(token, 'bookwormctrlcsbookwormctrlcs');
  if (isLogin) {
    const email = await getUserEmail(isLogin);
    if (email) {
      return res.json({ success: true, email });
    }
  }
  return res.json({ success: false, message: 'error' });
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

app.get('/api/search', async (req: Request, res: Response) => {
  const offset = parseInt((req.query.offset || '') as string, 10);
  const limit = parseInt((req.query.limit || '') as string, 10);

  if (Number.isNaN(offset) || offset < 0) {
    return res.status(400).send('Offset must be a non-negative number');
  }

  if (Number.isNaN(limit) || limit <= 0) {
    return res.status(400).send('Limit must be a number greater than zero');
  }

  try {
    const books = await searchBooks(
      (req.query.q ? req.query.q : '') as string,
      (req.query.fields ? req.query.fields : '') as string,
      offset,
      limit
    );
    if (!books) {
      return res.sendStatus(400);
    }
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/search/total', async (req: Request, res: Response) => {
  try {
    const count = await searchCount(
      (req.query.q ? req.query.q : '') as string,
      (req.query.fields ? req.query.fields : '') as string
    );
    return res.status(200).json(count);
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
  .post(requireLogin, checkContent, async (_, res) => {
    const content = res.locals.content as string;
    const user = res.locals.user as IUser;
    const book = res.locals.book as Ibook;

    // prevent users from submitting more than one review
    const reviewExists =
      book.reviews.filter((review) => review.username === user.username)
        .length !== 0;
    if (reviewExists)
      return res.status(403).send('Only one review allowed per user');

    const reviewData = {
      content,
      username: user.username
    };

    try {
      const updated = await Book.findOneAndUpdate(
        { isbn: book.isbn },
        { $push: { reviews: reviewData } },
        { upsert: true }
      );
      if (!updated)
        return res.status(500).send("We couldn't update the requested book");

      return res.status(200).json(reviewData);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

app
  .route('/api/books/:isbn/reviews/:username')
  .all(checkBookISBN)
  .all(checkReviewUsername)
  .all(requireLogin)

  // return a single review by username
  .get(async (_, res) => res.status(200).json(res.locals.review))

  // edit an existing review
  .put(checkReviewAuthor, checkContent, async (_, res) => {
    const book = res.locals.book as Ibook;
    const currentReview = res.locals.review as IReview;

    currentReview.content = res.locals.content;

    const newReviews = book.reviews.filter(
      (r) => r.username !== currentReview.username
    );
    newReviews.push(currentReview);

    try {
      await Book.findOneAndUpdate({ isbn: book.isbn }, { reviews: newReviews });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  })

  // delete an existing reivew
  .delete(checkReviewAuthor, async (_, res) => {
    const book = res.locals.book as Ibook;
    const review = res.locals.review as IReview;

    // TODO: Surely there's a cleaner way of doing this?
    try {
      const newReviews = book.reviews.filter(
        (r) => r.username !== review.username
      );
      await Book.findOneAndUpdate({ isbn: book.isbn }, { reviews: newReviews });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).send(error);
    }
  });

app
  .route('/api/bookshelf')
  .all(requireLogin)
  // add book to book shelf
  .put(checkIfBookInShelf, async (req: Request, res: Response) => {
    try {
      const isbn = req.query.isbn as string;
      const user = res.locals.user as IUser;
      const shelfid = req.query.shelfid as string;
      addBooktoShelf(isbn, shelfid, user.username, res);
      res.status(201);
      return res.end();
    } catch (error) {
      return res.status(500);
    }
  })
  //  remove book from all bookshelves
  .delete(checkIfBookInShelf, async (_, res) => res.status(200))

  //  return a bookshelf
  .get(async (req: Request, res: Response) => {
    // const shelfid = req.query.shelfid as string;
    const user = res.locals.user as IUser;
    try {
      fetchBookShelf(user.username, res);
      return res.status(200);
    } catch (error) {
      return res.status(500);
    }
  });

// Profile data route
app.post('/api/saveProfileData', async (req, res) => {
  try {
    const profile = new ProfileModel(req.body);
    await profile.save();
    res.status(201).send('Profile data saved successfully!');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/getProfileData/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // we check the username here in order to prevent spam requests that would
    // end up creating profile data for users that don't exist
    const user = await fetchUserByUserName(username);
    if (!user) return res.status(400).send('Invalid username');

    // find the profile data, or create it if it doesn't exist
    const profileData = await ProfileModel.findOneAndUpdate({ username }, { $set: { username }}, { upsert: true });
    if (!profileData) return res.sendStatus(404);

    return res.status(200).json(profileData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
