<<<<<<< HEAD
=======
import React, { useState } from 'react';
>>>>>>> b896769 (book page)
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Bookshelf.module.css';

interface BookType {
  isbn: string;
}

interface BookshelfProps {
  shelfName: string;
<<<<<<< HEAD
=======
  books: IBook[];
}

interface IBook {
  Title: string;
  Author: string;
  isbn: string;
  page_count: number;
  publication_date: Date;
  publisher: string;
  genres: string[];
}


function Bookshelf({ shelfName, books }: BookshelfProps): JSX.Element {
  return (
    <div className={styles.bookshelf}>
      <span className={styles.shelfTitle}>
        <Typography.Title level={2}>{shelfName}</Typography.Title>
        <Link to='/book/:isbn' style={{ textDecoration: 'none' }}>
          <Typography.Text style={{ fontSize: '1rem' }}>View All</Typography.Text>
        </Link>
      </span>
      <ul className={styles.bookList}>
        {books.map((book) => (
          <li key={book.isbn}>
            <Link to={`/book/${book.isbn}`}>
              <img
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                alt={`${book.Title} cover`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookshelf;
/*import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Bookshelf.module.css';

interface BookType {
  isbn: string;
}

interface BookshelfProps {
  shelfName: string;
>>>>>>> b896769 (book page)
  books: BookType[];
}

function Bookshelf({ shelfName, books }: BookshelfProps): JSX.Element {
  return (
    <div className={styles.bookshelf}>
      <span className={styles.shelfTitle}>
        <Typography.Title level={2}> {shelfName} </Typography.Title>
        <Link to='/browse' style={{ textDecoration: 'none' }}>
          <Typography.Text style={{ fontSize: '1rem' }}>
            {' '}
            View All{' '}
          </Typography.Text>
        </Link>
      </span>
      <ul className={styles.bookList}>
        {books.map((book) => (
          <li key={book.isbn}>
            <img
              src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
              alt={book.isbn}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookshelf;
<<<<<<< HEAD
=======
*/
>>>>>>> b896769 (book page)
