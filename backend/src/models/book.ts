import { Schema, model, connect, Date } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL ?? '';
<<<<<<< HEAD

// TODO: change capitalization in the db
interface Ibook {
=======
console.log(DATABASE_URL);

// TODO: change capitalization in the db
interface Ibook {
  text_reviews_count: string;
  ratings_count: string;
  average_rating: string;
  isbn13: string;
>>>>>>> b896769 (book page)
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
<<<<<<< HEAD
  genres: { type: [String], required: true }
=======
  genres: { type: [String], required: true },
  text_reviews_count: {type:String,required:true},
  ratings_count: {type:String,required:true},
  average_rating: {type:String,required:true},
  isbn13: {type:String,required:true},
>>>>>>> b896769 (book page)
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
<<<<<<< HEAD
  const res = await Book.findOne({ isbn });
=======
  //console.log(isbn);
  const res = await Book.findOne({ isbn });
  console.log(res);
  console.log(typeof res);
  console.log(Array.isArray(res) ? res.length : 'Not an array');

>>>>>>> b896769 (book page)

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
<<<<<<< HEAD

/**
 * Fetches books by Title or Author
 * 
 * @param title 
 * @param author 
 * @returns An array of books that match the search criteria
 */
export async function fetchBooksByTitleOrAuthor(title: string | undefined, author: string | undefined) {
  // Use the Book model to perform the search
  const query: any = {};
  if (title) {
    query.title = { $regex: title, $options: 'i' }; 
  }
  if (author) {
    query.author = { $regex: author, $options: 'i' }; 
  }
  try {
    const books = await Book.find(query);
    return books;
  } catch (error) {
    // Handle the error, e.g., log it and return an error response
    console.error('Error fetching books:', error);
    throw error;
  }
}
=======
>>>>>>> b896769 (book page)
