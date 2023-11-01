import { Schema, model, connect, Date } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL ?? '';

// TODO: change capitalization in the db
interface Ibook {
  title: string;
  author: string;
  isbn: string;
  page_count: number;
  publication_date: Date;
  publisher: string;
  genres: string[];
}

const bookSchema = new Schema<Ibook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  page_count: { type: Number, required: true },
  publication_date: { type: Date, required: true },
  publisher: { type: String, required: true },
  genres: { type: [String], required: true }
});

/**
 * Model for representing an individual Book.
 */
export const Book = model<Ibook>('Book', bookSchema);

/**
 * Fetches a single book by ISBN.
 *
 * For fetching books by ISBN13, use {@link fetchBookByISBN13} instead
 *
 * Returns null if a book with the provided ISBN is not found.
 * @param isbn The ISBN of the book to fetch from the database.
 * @returns A promise containing a single, potentially-null book document.
 */
export async function fetchBookByISBN(isbn: string): Promise<Ibook | null> {
  await connect(DATABASE_URL);

  // TODO: Cache recently fetched books?
  const res = await Book.findOne({ isbn });

  return res;
}

/**
 * Fetches all books in a database in a paginated manner, using the "skip & offset" approach.
 *
 * The results are sorted by mongodb's internal `_id` field in ascending order.
 *
 * The following are NOT guaranteed:
 * - The resulting array being non-empty
 * - The resulting array having exactly `limit` number of entires
 *
 * Returns null if the provided parameters are invalid, or if the database is empty.
 * @param offset The number of entries to skip. Must not be negative.
 * @param limit The number of entries to show on each page. Must be greater than 0.
 * @returns An array of resulting books.
 */
export async function fetchAllBooks(
  offset: number,
  limit: number
): Promise<Ibook[] | null> {
  if (offset < 0 || limit <= 0) return null;

  await connect(DATABASE_URL);

  // TODO: Using `.skip` is not an efficient way to paginate queries at scale
  // Ref: https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
  const res = await Book.find()
    .sort({ _id: 'ascending' }) // TODO: Use a better sort criteria
    .skip(offset)
    .limit(limit);

  return res;
}

/**
 * Fetches the total number of books in the database.
 * @returns A promise containing the total number of books.
 */
export async function fetchBookCount() {
  await connect(DATABASE_URL);

  const count = await Book.find().estimatedDocumentCount();

  return count;
}

/**
 * Searches the database on title, author, and isbn for matching records.
 *
 * Returns null for invalid parameters.
 * @param query The string to match
 * @param offset The number of entries to skip. Must not be negative.
 * @param limit The number of entries to show on each page. Must be greater than 0.
 * @returns An array of the matching books or null document.
 */
export async function searchBooks(
  query: string,
  offset: number,
  limit: number
): Promise<Ibook[] | null> {
  if (offset < 0 || limit < 0) return null;

  await connect(DATABASE_URL);

  const regQuery = new RegExp(query, 'i');

  // TODO: Using `.skip` is not an efficient way to paginate queries at scale
  // Ref: https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
  const res = await Book.find({
    $or: [{ title: regQuery }, { author: regQuery }, { isbn: regQuery }]
  })
    .sort({ _id: 1 })
    .skip(offset)
    .limit(limit);

  return res;
}

/**
 * Gets the total number of books that match a particular search query.
 *
 * @param query The string to match.
 * @returns Promise containing the amount of matching books.
 */
export async function searchCount(query: string): Promise<number | null> {
  await connect(DATABASE_URL);

  await connect(DATABASE_URL);

  const regQuery = new RegExp(query, 'i');
  const res = await Book.find({
    $or: [{ title: regQuery }, { author: regQuery }, { isbn: regQuery }]
  })
    .sort({ _id: 1 })
    .count();

  return res;
}
