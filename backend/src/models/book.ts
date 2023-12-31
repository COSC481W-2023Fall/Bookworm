import { Schema, model, Date, now, SortOrder } from 'mongoose';

/**
 * Represents a book in the database.
 */
export interface Ibook {
  title: string;
  author: string;
  isbn: string;
  page_count: number;
  publication_date: Date;
  publisher: string;
  genres: string[];
  reviews: IReview[];
  description: string | null;
  average_rating: number;
}

export interface IReview {
  _id: string;
  username: string;
  content: string;
  created_at: Date;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reviewSchema = new Schema<IReview>({
  username: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, required: true, default: now }
});

const bookSchema = new Schema<Ibook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true },
  page_count: { type: Number, required: true },
  publication_date: { type: Date, required: true },
  publisher: { type: String, required: true },
  genres: { type: [String], required: true },
  reviews: [reviewSchema],
  description: { type: String || null, required: true },
  average_rating: { type: Number, required: true }
});

/**
 * Model for representing an individual Book.
 */
export const Book = model<Ibook>('Book', bookSchema);

/**
 * Fetches a single book by ISBN.
 *
 * Returns null if a book with the provided ISBN is not found.
 * @param isbn The ISBN of the book to fetch from the database.
 * @returns A promise containing a single, potentially-null book document.
 */
export async function fetchBookByISBN(isbn: string): Promise<Ibook | null> {
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
  fields: string,
  sort: string,
  order: string,
  offset: number,
  limit: number
): Promise<Ibook[] | null> {
  if (offset < 0 || limit <= 0) return null;

  const regQuery = new RegExp(query, 'i');

  const searchFields = fields.split(',');

  const safeFields = ['title', 'author', 'publisher', 'isbn', 'genres', ''];

  const sortSafe = [
    'title',
    'author',
    'publisher',
    'genres',
    'page_count',
    'publication_date'
  ];

  const sortObject = {
    [sort]: order as SortOrder
  };

  if (!searchFields.every((elem) => safeFields.includes(elem))) {
    return null;
  }

  if (!sortSafe.includes(sort)) {
    return null;
  }

  let filter: { [key: string]: RegExp }[] = [
    { title: regQuery },
    { author: regQuery },
    { isbn: regQuery },
    { publisher: regQuery },
    { genres: regQuery }
  ];

  if (searchFields[0] !== '') {
    filter = searchFields.map((field) => ({ [field]: regQuery }));
  }

  const res = await Book.find({ $or: filter })
    .sort(sortObject)
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
export async function searchCount(
  query: string,
  fields: string
): Promise<number | null> {
  const regQuery = new RegExp(query, 'i');

  const searchFields = fields.split(',');

  const safeFields = ['title', 'author', 'publisher', 'isbn', 'genres', ''];

  if (!searchFields.every((elem) => safeFields.includes(elem))) {
    return null;
  }

  let filter: { [key: string]: RegExp }[] = [
    { title: regQuery },
    { author: regQuery },
    { isbn: regQuery },
    { publisher: regQuery },
    { genres: regQuery }
  ];

  if (searchFields[0] !== '') {
    filter = searchFields.map((field) => ({ [field]: regQuery }));
  }

  const res = await Book.find({
    $or: filter
  })
    .sort({ _id: 1 })
    .count();

  return res;
}
