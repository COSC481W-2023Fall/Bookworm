import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IReview, Ibook, fetchBookByISBN } from './models/book';
import { DecodedToken, IUser, User, removeBookFromShelf } from './models/user';

/**
 * Middleware to check that the requested ISBN references a valid book in the database.
 *
 * If the book is found, this will pass a `book` local response variable, which contains the book's data.
 * @param req The incoming express request.
 * @param res The outbound express response.
 * @param next The express 'next' middleware callback.
 */
export async function checkBookISBN(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { isbn } = req.params;

  try {
    const book = await fetchBookByISBN(isbn);
    if (!book) {
      return res.status(404).send(`No book found with ISBN ${isbn}`);
    }

    // this will save us from having to query for the actual book data again once
    // this middleware exits
    res.locals.book = book;
    return next();
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}

/**
 * Middleware to check that the requested review ID references a valid review. The review ID is extracted
 * from the request route parameters.
 *
 * If the review is found, this will pass a `review` local response variable, which contains the review's data.
 * @param req The incoming express request.
 * @param res The outbound express response.
 * @param next The express 'next' middleware callback.
 */
export async function checkReviewUsername(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.params;

  const { reviews } = res.locals.book as Ibook;

  const usernameSet = new Set(reviews.map((review) => review.username));

  if (!usernameSet.has(username)) {
    return res.status(404).send(`No review found from username ${username}`);
  }

  // We don't need to check array length in this case, as we already
  // checked if the review ID was valid
  const review = reviews.filter((r) => r.username === username)[0];
  res.locals.review = review;

  return next();
}

/**
 * Middleware to require that a user is logged in.
 *
 * This will return an HTTP 401 status code if the user isn't logged in.
 *
 * If the user is logged in, this will pass a `user` local response variable
 * which contains the user data of the logged in user.
 * @param req The incoming express request.
 * @param res The outbound express response.
 * @param next The express 'next' middleware callback.
 */
export async function requireLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'You need to be logged in to do this' });
  }

  try {
    const decoded = jwt.verify(
      token,
      'bookwormctrlcsbookwormctrlcs'
    ) as DecodedToken;
    const { name } = decoded;

    const user = await User.findOne({ username: name });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.locals.user = user;

    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
}

/**
 * Middleware to ensure user's can't modify/delete other user's reviews.
 * @param req The incoming express request.
 * @param res The outbound express response.
 * @param next The express 'next' middleware callback.
 */
export async function checkReviewAuthor(
  _: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user as IUser;
  const review = res.locals.review as IReview;

  if (user.username !== review.username) {
    return res
      .status(403)
      .json({ message: "Cannot modify/delete another user's review" });
  }

  return next();
}

/**
 * Middleware to ensure a non-empty 'content' string with a max length of 2000 characters
 * is provided in the request body.
 *
 * This is mainly used for book review endpoints.
 *
 * If 'content' is missing or is empty, this will return a 400 status code.
 *
 * This will pass a 'reviewContent' local response variable on success.
 *
 * @param req The incoming express request.
 * @param res The outbound express response.
 * @param next The express 'next' middleware callback.
 */
export async function checkContent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { rawContent } = req.body;

  if (!rawContent) return res.status(400).send("'content' is required");

  const content = rawContent as string;

  if (content.length === 0 || content.length > 2000)
    return res
      .status(400)
      .send(
        "'content' must be a non-empty string with a maximum length of 2000 characters"
      );

  res.locals.content = content;

  return next();
}

export async function checkIfBookInShelf(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isbn = req.query.isbn as string;
  const user = res.locals.user as IUser;

  if (user.reading_bookshelf.includes(isbn)) {
    removeBookFromShelf(isbn, '1', user.username, res);
  }
  if (user.completed_bookshelf.includes(isbn)) {
    removeBookFromShelf(isbn, '2', user.username, res);
  }
  if (user.dropped_bookshelf.includes(isbn)) {
    removeBookFromShelf(isbn, '3', user.username, res);
  }
  if (user.plan_to_bookshelf.includes(isbn)) {
    removeBookFromShelf(isbn, '4', user.username, res);
  }
  return next();
}
