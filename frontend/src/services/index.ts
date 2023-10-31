import axios from 'axios';

// TODO: Ideally, this would reference the backend environment variables
const PORT = 3001;

// We need this so that development builds don't make API calls on production,
// and so that production doesn't reference localhost as in the end user's
// machine via the browser.
const BASE_URL = import.meta.env.DEV
  ? `http://localhost:${PORT}/api`
  : 'https://capstone.caseycodes.dev/api';

// TODO: Duplicate code
export type IBook = {
  title: string;
  author: string;
  isbn: string;
  page_count: number;
  publication_date: Date;
  publisher: string;
  genres: string[];
  reviews: [
    {
      username: string;
      content: string;
      created_at: Date;
    }
  ];
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

// Perform an asynchronous sign-in request using Axios.
export async function fetchSignIn(val: SignData) {
  const res = await axios.post(`${BASE_URL}/sign-in`, { val });
  return res;
}

// Perform an asynchronous sign-out request using axios
export async function fetchSignOut() {
  const res = await axios.get(`${BASE_URL}/sign-out`);
  return res;
}

// Perform an asynchronous homepage request using axios
export async function fetchHome() {
  const res = await axios.get(`${BASE_URL}`);
  return res;
}

// Registers a new user by submitted form data
export async function submitRegistrationData<T>(formData: T) {
  return axios.post(`${BASE_URL}/register`, formData);
}
