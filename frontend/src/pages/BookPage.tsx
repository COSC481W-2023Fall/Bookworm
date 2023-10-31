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

  