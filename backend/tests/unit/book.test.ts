import { describe, expect, test } from '@jest/globals';
import { fetchBookByISBN } from '../../src/models/book';

describe('Book Fetching', () => {
  test('Fetch Book With ISBN 0618346252', async () => {
    const book = await fetchBookByISBN('0618346252');

    expect(book).not.toBeNull();
  });

  test('Return null on invalid ISBN queries', async () => {
    const empty = await fetchBookByISBN('');
    const space = await fetchBookByISBN('     ');
    const garbage = await fetchBookByISBN('1t5g5w436swethr');

    expect(empty).toBeNull();
    expect(space).toBeNull();
    expect(garbage).toBeNull();
  });
});