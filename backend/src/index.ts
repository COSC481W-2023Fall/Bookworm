import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchBookByISBN } from './models/book';

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

app.get('/books/:isbn', async (req, res) => {
  const isbn = req.params.isbn;

  const book = await fetchBookByISBN(isbn);

  if (book === null) {
    return await res.status(404).send(`No book found with ISBN ${isbn}`);
  }
  
  await res.status(200).json(book);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
