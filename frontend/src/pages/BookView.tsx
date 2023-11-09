import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import {
  IBook,
  fetchBookByISBN,
  addBookToShelf,
  removeBookFromShelf
} from '../services';
import Navbar from '../components/Navbar';
import useAuth from './UserAuth';
import styles from './BookView.module.css';

function BookView(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();
  const { isbn } = useParams<{ isbn: string }>();
  const [book, setBook] = useState<IBook | null>(null);

  const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    navigate(`/book/${isbn}/reviews`);
  }

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
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#FEC80B'
                }
              }}
            >
              <Button type='primary' shape='round' size='large' onClick={routeChange}>
                See Reviews
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
