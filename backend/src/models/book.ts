import { Schema, model, connect, Date } from 'mongoose';
import { DATABASE_URL } from '.';

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
  const res = await Book.findOne({ isbn }).exec();

  return res;
}
