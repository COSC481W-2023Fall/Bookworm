import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { List, Typography, Avatar, Button, ConfigProvider } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
  IReview,
  addReviewByISBN,
  fetchBookByISBN,
  deleteReview
} from '../services';
import styles from './ReviewBox.module.css';
import useAuth from '../pages/UserAuth';

type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';

export default function ReviewBox(): JSX.Element {
  const { isbn } = useParams<{ isbn: string }>();
  const [position] = useState<PaginationPosition>('bottom');
  const [align] = useState<PaginationAlign>('center');
  const [limit, _] = useState(5);
  const [offset, setOffset] = useState(0);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [count, setCount] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const { auth, username } = useAuth();

  useEffect(() => {
    async function fetchReviews() {
      const book = await fetchBookByISBN(isbn!);

      if (book) {
        setReviews(book.reviews);
        setCount(book.reviews.length);
      }
    }

    fetchReviews();
  }, [offset, limit, isbn]);

  const handleReviewText = (event: { target: { value: string } }) => {
    setReviewText(event.target.value);
  };

  const handleReviewSubmit = () => {
    addReviewByISBN(isbn as string, reviewText);
    setReviewText('');
    window.location.reload();
  };

  const deleteButton = () => {
    deleteReview(isbn as string, username);
    window.location.reload();
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FEC80B'
        }
      }}
    >
      {auth ? (
        <div className={styles.addReviewContainer}>
          <Typography.Title level={2}>Add Review: </Typography.Title>
          <TextArea
            placeholder='Add your own review...'
            style={{ height: 200, resize: 'none' }}
            onChange={handleReviewText}
            value={reviewText}
          />
          <div className={styles.buttonBox}>
            <Button
              type='primary'
              shape='round'
              size='large'
              className={styles.submitButton}
              onClick={handleReviewSubmit}
            >
              Submit Review
            </Button>
            <Button
              shape='round'
              size='large'
              className={styles.submitButton}
              onClick={deleteButton}
            >
              Delete Review
            </Button>
          </div>
        </div>
      ) : null}
      <Typography.Title level={2}>Community Reviews</Typography.Title>
      <List
        pagination={{
          position,
          align,
          pageSize: limit,
          total: count,
          showSizeChanger: false, // TODO: Allow size changing
          async onChange(page, pageSize) {
            setOffset((page - 1) * pageSize);
          }
        }}
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item>
            <List.Item.Meta
              // TODO: Replace this with user's pfp
              avatar={
                <Avatar
                  src={`https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`}
                />
              }
              title={`${review.username} @ ${review.created_at}`}
              description={review.content}
            />
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
}
