import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Bookshelf.module.css';

interface BookType {
  isbn: string;
}

interface BookshelfProps {
  shelfName: string;
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
