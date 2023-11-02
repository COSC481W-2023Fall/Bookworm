import { afterAll, describe, expect, test } from '@jest/globals';
import mongoose from 'mongoose';
import { fetchUserByUserName } from '../../src/models/user';

describe('Fetch a single user', () => {
    test('Fetch user with username tfurey', async () => {
      const book = await fetchUserByUserName('tfurey');
  
      expect(book).not.toBeNull();
    });
  
    test('Return null on invalid ISBN values', async () => {
      const empty = await fetchUserByUserName('');
      const space = await fetchUserByUserName('     ');
      const garbage = await fetchUserByUserName('1t5g5w436swethr');
  
      expect(empty).toBeNull();
      expect(space).toBeNull();
      expect(garbage).toBeNull();
    });
  });