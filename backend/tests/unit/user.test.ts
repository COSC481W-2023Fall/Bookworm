import { afterAll, expect, test } from '@jest/globals';
import databaseConnection from '../../src/databaseConnection';
import connectToDb from '../../src/databaseConnection';

import {
  authenticateUser,
  registerUser,
  resetPassword,
  verifyJwtToken,
  fetchUserByUserName
} from '../../src/models/user';

// Connect to mongoDB
databaseConnection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
databaseConnection.once('open', () => {
  console.log('Connected to MongoDB');
});

test('Provide a valid token and it will return a specific name', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6InRyZWUiLCJpYXQiOjE2OTk0NzI4NDl9.utwU4TEobRU3eQQhtZJXM0CmCgK-PGXaqlq3XYFcp94';
  expect(verifyJwtToken(token, 'bookwormctrlcsbookwormctrlcs')).toBe('tree');
});

test('Provide a invalid token and return null', () => {
  const token =
    'e1JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidHJlZSIsImlhdCI6MTY5OTQ2NzAwN30.ubNQUtSWTJ1OqbOsdT-JkJKJLJOqmTaACxTFdJRmg7w';
  expect(verifyJwtToken(token, 'bookwormctrlcsbookwormctrlcs')).toBeNull();
});

test('User exists and reset password successfully', async () => {
  const data = await resetPassword('4', 'tree');
  expect(data).toBe(true);
});

test('User does not exist and reset password successfully', async () => {
  const data = await resetPassword('4', 'trees');
  expect(data).toBe(false);
});

// test('The new user register successfully', async () => {
//     const data = await registerUser('notreal12312222222222222222222', 'notrealuser12321@hotmail.com', '1');
//     expect(data).toBe(true);
// });

test('Not a new user and register unsuccessfully', async () => {
  const data = await registerUser('tree', 'tree@hotmail.com', '1');
  expect(data).toBe(false);
});

test('user sign in successfully', async () => {
  const data = await authenticateUser('tree@hotmail.com', '4');
  expect(data).toBe('tree');
});

test('user sign in unsuccessfully', async () => {
  const data = await authenticateUser('tree1@hotmail.com', '4');
  expect(data).toBe(null);
});

afterAll((done) => {
  databaseConnection.close();
}
// import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
// import mongoose from 'mongoose';
// import { fetchUserByUserName } from '../../src/models/user';

// import connectToDb from '../../src/databaseConnection';

beforeAll((done) => {
  connectToDb();
  done();
});

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

afterAll((done) => {
  mongoose.connection.close();
  done();
});
