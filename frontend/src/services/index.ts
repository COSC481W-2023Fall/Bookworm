import axios from 'axios';

// TODO: Ideally, this would reference the backend environment variables
const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}/api`;

export type IBook = {
  Title: string;
  Author: string;
  isbn: string;
  page_count: number;
  publication_date: Date;
  publisher: string;
  genres: string[];
};

export async function fetchBookByISBN(isbn: string) {
  const res = await axios.get(`${BASE_URL}/books/${isbn}`);

  return res.data as IBook | null;
}

export async function paginateBooks(offset: number, limit: number) {
  const res = await axios.get(
    `${BASE_URL}/books?offset=${offset}&limit=${limit}`
  );

  if (res.status !== 200) {
    return [];
  }

  return res.data as IBook[];
}

export async function getBookCount() {
  const res = await axios.get(`${BASE_URL}/books/total`);

  return res.data as number;
}

export type SignData = {
  email: string;
  password: string;
};

export async function fetchSignIn(val: SignData) {
  const res = await axios.post(`${BASE_URL}/sign-in`, { val });
  return res;
}

export async function fetchSignOut() {
  const res = await axios.get(`${BASE_URL}/sign-out`);
  return res;
}

export async function fetchHome() {
  const res = await axios.get(`${BASE_URL}`);
  return res;
}
