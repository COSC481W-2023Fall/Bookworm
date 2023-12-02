import { Typography, Image } from 'antd';
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
      </span>
      <ul className={styles.bookList}>
        {books.map((book) => (
          <li key={book.isbn}>
            <Link to={`/book/${book.isbn}`}>
              <Image
                preview={false}
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                width={180}
                height={300}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bookshelf;
