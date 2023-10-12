import { Schema, model, connect, Date } from 'mongoose';

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
