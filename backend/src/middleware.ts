import { NextFunction, Request, Response } from "express";
import { IReview, Ibook, fetchBookByISBN } from "./models/book";
import jwt from 'jsonwebtoken';
import { DecodedToken, IUser, User } from "./models/user";

/**
* Middleware to check that the requested ISBN references a valid book in the database.
*
* If the book is found, this will pass a `book` local response variable, which contains the book's data.
* @param req The incoming express request.
* @param res The outbound express response.
* @param next The express 'next' middleware callback.
*/
export async function checkBookISBN(req: Request, res: Response, next: NextFunction) {
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
export async function checkReviewID(req: Request, res: Response, next: NextFunction) {
  const { reviewId } = req.params;

  const { reviews } = res.locals.book as Ibook;

  // eslint-disable-next-line no-underscore-dangle
  const reviewIdSet = new Set(reviews.map((review) => review._id));

  if (!reviewIdSet.has(reviewId)) {
      return res.status(404).send(`No review found with ID ${reviewId}`);
  }

  // We don't need to check array length in this case, as we already
  // checked if the review ID was valid
  // eslint-disable-next-line no-underscore-dangle
  const review = reviews.filter((r) => r._id === reviewId)[0];
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
export async function requireLogin(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'You need to be logged in to do this'});
  }

  try {
    const decoded = jwt.verify(token, 'bookwormctrlcsbookwormctrlcs') as DecodedToken;
    const { name } = decoded;

    const user = await User.findOne({ username: name });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials'});
    }

    res.locals.user = user;

    return next()
  }
  catch (error) {
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
export async function checkReviewAuthor(_: Request, res: Response, next: NextFunction) {
  const user = res.locals.user as IUser;
  const review = res.locals.review as IReview;

  if (user.username != review.username) {
    return res.status(403).json({ message: 'Cannot modify/delete another user\'s review' });
  }

  return next();
}
