import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IBook, fetchBookByISBN } from '../services';
import Navbar from '../components/Navbar';
import useAuth from './UserAuth';
import {
  Button,
  ConfigProvider,
  Image,
  Rate,
  Spin,
  Typography,
  Select,
  Form
} from 'antd';
import styles from './BookView.module.css';

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

  const handleChangeShelfSelector = (value: string) => {
    //TODO: add book to shelf on change
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />
      {book ? (
        <div className={styles.container}>
          <div className={styles.left}>
            <Image
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
                  placeholder={'select bookshelf'}
                  onChange={handleChangeShelfSelector}
                  options={[
                    { value: 'No shelf', label: 'No Shelf' },
                    { value: 'Reading Bookshelf', label: 'Reading' },
                    { value: 'Completed Bookshelf', label: 'Completed' },
                    { value: 'dropped Bookshelf', label: 'dropped' },
                    { value: 'Plan to read Bookshelf', label: 'Plan to read' }
                  ]}
                ></Select>
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
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#FEC80B'
                }
              }}
            >
              <Button type='primary' shape='round' size='large'>
                Want to Buy?
              </Button>
            </ConfigProvider>
          </div>
          <div className={styles.right}>
            <Typography.Title style={{ marginTop: '0px' }}>
              {book.title}
            </Typography.Title>
            <Typography.Paragraph>{book.author}</Typography.Paragraph>
            <Typography.Paragraph>
              {book.description ? book.description : 'Description not found.'}
            </Typography.Paragraph>
          </div>
        </div>
      ) : (
        <Spin size='large' />
      )}
    </div>
  );
}
export default BookView;