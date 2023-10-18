import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchAllBooks, fetchBookByISBN } from './models/book';

// load our .env file
dotenv.config();
const PORT = process.env.PORT ?? 3001;
console.log()

const app = express();
app.use(express.json());
app.use(cors());

app.get('/ping', (_, res) => {
  res.status(200).send('Pong!');
});

app.get('/books', async (req, res) => {
  const offset = parseInt((req.query.offset ?? '') as string);
  const limit = parseInt((req.query.limit ?? '') as string);
  
  // `parseInt` returns `NaN` on failure.
  // Annoyingly, directly comparing said result to `NaN` gives linting errors
  if (Number.isNaN(offset) || offset < 0) {
    return await res.status(400).send('offset must be a non-negative number');
  }

  if (Number.isNaN(limit) || limit <= 0) {
    return await res.status(400).send('limit must be a number greater than zero'); 
  }

  const books = await fetchAllBooks(offset, limit);

  if (books === null) {
    return await res.status(404).send("Empty database");
  }

  await res.status(200).json(books);
});

app.get('/books/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  const book = await fetchBookByISBN(isbn);

  if (book === null) {
    return await res.status(404).send(`No book found with ISBN ${isbn}`);
  }
  
  await res.status(200).json(book);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
