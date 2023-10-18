import dotenv from 'dotenv';

dotenv.config();
export const DATABASE_URL = process.env.DATABASE_URL ?? '';
console.log(DATABASE_URL);

export { Book } from "./book";