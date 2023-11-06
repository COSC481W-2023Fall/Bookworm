import { afterAll, describe, expect, test } from '@jest/globals';
import mongoose from 'mongoose';
import {
  fetchAllBooks,
  fetchBookByISBN,
  searchBooks
} from '../../src/models/book';

describe('Fetch a single book', () => {
  test('Fetch book with ISBN 0618346252', async () => {
    const book = await fetchBookByISBN('0618346252');

    expect(book).not.toBeNull();
  });

  test('Return null on invalid ISBN values', async () => {
    const empty = await fetchBookByISBN('');
    const space = await fetchBookByISBN('     ');
    const garbage = await fetchBookByISBN('1t5g5w436swethr');

    expect(empty).toBeNull();
    expect(space).toBeNull();
    expect(garbage).toBeNull();
  });
});

describe('Fetch multiple books', () => {
  test('Fetch the first 10 books', async () => {
    const books = await fetchAllBooks(0, 10);

    expect(books).not.toBe(null);
    expect(books?.length).toBe(10);
  });

  test('Return null on invalid parameters', async () => {
    const negativeOffset = await fetchAllBooks(-1, 10);
    const zeroLimit = await fetchAllBooks(0, 0);
    const valid = await fetchAllBooks(0, 2);

    expect(negativeOffset).toBeNull();
    expect(zeroLimit).toBeNull();
    expect(valid).not.toBeNull();
  });
});

describe('Search through all books', () => {
  test('Make a search', async () => {
    const books = await searchBooks('hitchhiker', '', 0, 5);

    expect(books!).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          isbn: '0517226952'
        })
      ])
    );
    expect(books?.length).toBeGreaterThan(0);
    expect(books?.length).toBeLessThanOrEqual(5);
  });

  test('Bad data searh', async () => {
    const emptyQuery = await searchBooks('badisbn', 'isbn', 0, 5);
    const badField = await searchBooks('hitchhiker', 'issbn', 0, 5);
    const negativeOffset = await searchBooks('hithhiker', 'title', -1, 0);
    const zeroLimit = await searchBooks('hithhiker', 'title', 0, 0);
    const valid = await searchBooks('hitchhiker', 'title', 0, 5);

    expect(emptyQuery).toStrictEqual([]);
    expect(badField).toBe(null);
    expect(negativeOffset).toBe(null);
    expect(zeroLimit).toBe(null);
    expect(valid).not.toBe(null);
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
