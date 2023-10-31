import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookByISBN } from '../services';

interface Book {
  title: string;
  author: string;
  isbn: string;
  page_count: number;
  publication_date: Date;
  publisher: string;
  genres: string[];
}

function BookPage() {
    const { isbn } = useParams<{ isbn: string }>();
    const [book, setBook] = useState<Book | null>(null);

    const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

    useEffect(() => {
      async function fetchBook() {
        const fetchedBook = await fetchBookByISBN(isbn!);
        setBook(fetchedBook);
      }
  
      fetchBook();
    }, [isbn]);

    return (
      <div>
        
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img src={coverImageUrl} alt="Book cover" style={{ marginRight: '20px' }} />
          
          {book ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
              <p>ISBN: {book.isbn}</p>
              <p>Page Count: {book.page_count}</p>
              <p>Publication Date: {book.publication_date.toLocaleDateString()}</p>
              <p>Publisher: {book.publisher}</p>
              <p>Genres: {book.genres.join(', ')}</p>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
}

export default BookPage;

/*import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookByISBN } from '../services';  // Ensure this import is correct

interface Book {
    text_reviews_count: string;
    ratings_count: string;
    average_rating: string;
    isbn13: string;
    title: string;
    author: string;
    isbn: string;
    page_count: number;
    publication_date: Date;
    publisher: string;
    genres: string[];
}

function BookPage() {
    const { isbn } = useParams<{ isbn: string }>();
    const [book, setBook] = useState<Book | null>(null);
  
    useEffect(() => {
        async function fetchBook() {
            try {
                if (isbn) {
                    const fetchedBook = await fetchBookByISBN(isbn);
                    console.log('Fetched Book:', fetchedBook);
                    setBook(fetchedBook);
                }
            } catch (error) {
                console.error("Error fetching the book:", error);
            }
        }

        fetchBook();
    }, [isbn]);
  
    if (!book) {
        return <div>Loading..</div>;
    }

    const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;

    return (
        <div>
            <Link to="/bookshelf">Back to Bookshelf</Link>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={coverImageUrl} alt={`${book.title} cover`} style={{ marginBottom: '20px' }} />
                <h1>{book.title}</h1>
                <h2>{book.author}</h2>
                <p>ISBN: {book.isbn}</p>
                <p>ISBN-13: {book.isbn13}</p>
                <p>Average Rating: {book.average_rating}</p>
                <p>Ratings Count: {book.ratings_count}</p>
                <p>Text Reviews Count: {book.text_reviews_count}</p>
                <p>Page Count: {book.page_count}</p>
                <p>Publication Date: {book.publication_date.toLocaleDateString()}</p>
                <p>Publisher: {book.publisher}</p>
                <p>Genres: {book.genres.join(', ')}</p>
            </div>
        </div>
    );
}


export default BookPage;

/*import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookByISBN } from '../services';  // Ensure this import is correct

interface Book {
    title: string;
    author: string;
    isbn: string;
    page_count: number;
    publication_date: Date;
    publisher: string;
    genres: string[];
}

function BookPage() {
  const { isbn } = useParams() as { isbn: string };  // Type assertion here
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function fetchBook() {
      const fetchedBook = await fetchBookByISBN(isbn);
      setBook(fetchedBook);
    }

    fetchBook();
  }, [isbn]);
  console.log(book);

  if (!book) {
    console.log(book);
    return <div>Loading...</div>;
  }
  console.log(book);
  const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;

  return (
    <div>
      <Link to="/bookshelf">Back to Bookshelf</Link>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={coverImageUrl} alt={`${book.title} cover`} style={{ marginBottom: '20px' }} />
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <p>ISBN: {book.isbn}</p>
        <p>Page Count: {book.page_count}</p>
        <p>Publication Date: {book.publication_date.toLocaleDateString()}</p>
        <p>Publisher: {book.publisher}</p>
        <p>Genres: {book.genres.join(', ')}</p>
      </div>
    </div>
  );
}

export default BookPage;

/*import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBookByISBN } from '../services';  // Ensure this import is correct

interface Book {
    title: string;
    author: string;
    isbn: string;
    page_count: number;
    publication_date: Date;
    publisher: string;
    genres: string[];
  }

function BookPage() {
  const { isbn } = useParams() as { isbn: string };  // Type assertion here
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function fetchBook() {
      const fetchedBook = await fetchBookByISBN(isbn);
      setBook(fetchedBook);
    }

    fetchBook();
  }, [isbn]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/bookshelf">Back to Bookshelf</Link>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>ISBN: {book.isbn}</p>
      <p>Page Count: {book.page_count}</p>
      <p>Publication Date: {book.publication_date.toLocaleDateString()}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Genres: {book.genres.join(', ')}</p>
    </div>
  );
}

export default BookPage;
*/