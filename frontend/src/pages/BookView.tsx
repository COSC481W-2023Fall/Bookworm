import { Form, Image, Rate, Select, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ReviewBox from '../components/ReviewBox';
import {
  IBook,
  addBookToShelf,
  fetchBookByISBN,
  removeBookFromShelf
} from '../services';
import styles from './BookView.module.css';
import useAuth from './UserAuth';

function BookView(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();
  const { isbn } = useParams<{ isbn: string }>();
  const [book, setBook] = useState<IBook | null>(null);

  const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  useEffect(() => {
    async function fetchBook() {
      const fetchedBook = await fetchBookByISBN(isbn!);
      setBook(fetchedBook);
    }

    fetchBook();
  }, [isbn]);

  const handleChangeShelfSelector = (value: number) => {
    //  TODO: add book to shelf on change
    if (book != null) {
      if (value > 0) {
        const shelfID = value;
        return addBookToShelf(book.isbn, shelfID);
      }
      if (value === 0) return removeBookFromShelf(book.isbn);
    }
    return false;
  };

  return (
    <div className={styles.bookviewBox}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />
      {book ? (
        <div className={styles.container}>
          <div className={styles.left}>
            <Image
              preview={false}
              src={coverImageUrl}
              className={styles.image}
              width='300px'
              fallback='../../public/image_not_available.png'
            />
            <div className={styles.ratingBox}>
              <Rate
                defaultValue={book.average_rating}
                disabled
                className={styles.rating}
                id={styles.ratingStars}
              />
              <label htmlFor={styles.ratingStars} className={styles.rating}>
                {book.average_rating}
              </label>
            </div>
            <div className={styles.shelfSelector}>
              <Form.Item label='Add to bookshelf:'>
                <Select
                  placeholder='select bookshelf'
                  onChange={handleChangeShelfSelector}
                  options={[
                    { value: 0, label: 'No Shelf' },
                    { value: 1, label: 'Reading' },
                    { value: 2, label: 'Completed' },
                    { value: 3, label: 'Dropped' },
                    { value: 4, label: 'Plan to read' }
                  ]}
                />
              </Form.Item>
            </div>
            <div>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Page Count: {book.page_count}</p>
              <p>
                Publication Date:{' '}
                {book.publication_date.toString().substring(0, 10)}
              </p>
              <p>Publisher: {book.publisher}</p>
              <p>Genres: {book.genres.join(', ')}</p>
            </div>
          </div>
          <div className={styles.right}>
            <Typography.Title style={{ marginTop: '0px' }}>
              {book.title}
            </Typography.Title>
            <Typography.Paragraph>{book.author}</Typography.Paragraph>
            <Typography.Paragraph>
              {book.description ? book.description : 'Description not found.'}
            </Typography.Paragraph>
            <ReviewBox />
          </div>
        </div>
      ) : (
        <Spin
          size='large'
          style={{ alignSelf: 'center', justifyContent: 'center' }}
        />
      )}
    </div>
  );
}
export default BookView;
