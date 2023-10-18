import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchAllBooks, fetchBookByISBN } from './models/book';

// load our .env file
dotenv.config();
const PORT = process.env.PORT ?? 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/ping', (_, res) => {
  res.status(200).send('Pong!');
});

app.get('/books', async (req, res) => {
  const offset = parseInt((req.query.offset ?? '') as string, 10);
  const limit = parseInt((req.query.limit ?? '') as string, 10);

  // `parseInt` returns `NaN` on failure.
  // Annoyingly, directly comparing said result to `NaN` gives linting errors
  if (Number.isNaN(offset) || offset < 0) {
    return res.status(400).send('offset must be a non-negative number');
  }

  if (Number.isNaN(limit) || limit <= 0) {
    return res.status(400).send('limit must be a number greater than zero');
  }

  const books = await fetchAllBooks(offset, limit);

  if (books === null) {
    return res.status(404).send('Empty database');
  }

  return res.status(200).json(books);
});

app.get('/books/:isbn', async (req, res) => {
  const { isbn } = req.params;

  const book = await fetchBookByISBN(isbn);

  if (book === null) {
    return res.status(404).send(`No book found with ISBN ${isbn}`);
  }

  return res.status(200).json(book);
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
