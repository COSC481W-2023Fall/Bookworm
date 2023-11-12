import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { List, Typography, Avatar, Button, ConfigProvider, Flex } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {
  IReview,
  addReviewByISBN,
  fetchBookByISBN,
  deleteReview,
  editReview
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
  const [userReviewExists, setReviewExists] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      const book = await fetchBookByISBN(isbn!);

      if (book) {
        setReviews(book.reviews);
        setCount(book.reviews.length);
        setReviewExists(
          book.reviews.some((review) => review.username === username)
        );
      }
    }

    fetchReviews();
  }, [offset, limit, isbn, username]);

  const handleReviewText = (event: { target: { value: string } }) => {
    setReviewText(event.target.value);
  };

  const handleReviewAddSubmit = () => {
    addReviewByISBN(isbn as string, reviewText);
    setReviewText('');
    window.location.reload();
  };

  const handleReviewEditSubmit = () => {
    editReview(isbn as string, username, reviewText);
    setReviewText('');
    window.location.reload();
  };

  const deleteButton = () => {
    deleteReview(isbn as string, username);
    window.location.reload();
  };

  const addReviewComponent = (auth: boolean, userReviewExists: boolean) => {
    if (auth && userReviewExists) {
      return (
        <div className={styles.addReviewContainer}>
          <Typography.Title level={2}>Edit Review: </Typography.Title>
          <TextArea
            placeholder='Edit your own review...'
            style={{ minHeight: 200, resize: 'none' }}
            onChange={handleReviewText}
            maxLength={2000}
            showCount
            value={reviewText}
          />
          <div className={styles.buttonBox}>
            <Button
              type='primary'
              shape='round'
              size='large'
              className={styles.submitButton}
              onClick={handleReviewEditSubmit}
            >
              Submit Review Edit
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
      );
    }
    if (auth && !userReviewExists) {
      return (
        <div className={styles.addReviewContainer}>
          <Typography.Title level={2}>Add Review: </Typography.Title>
          <TextArea
            placeholder='Add your own review...'
            style={{ minHeight: 200, resize: 'none' }}
            onChange={handleReviewText}
            maxLength={2000}
            showCount
            value={reviewText}
          />
          <div className={styles.buttonBox}>
            <Button
              type='primary'
              shape='round'
              size='large'
              className={styles.submitButton}
              onClick={handleReviewAddSubmit}
            >
              Submit Review
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.addReviewContainer}>
        <Typography.Title level={2}>Add Review: </Typography.Title>
        <TextArea
          placeholder='Sign-in to add your own review...'
          style={{ minHeight: 200, resize: 'none' }}
          onChange={handleReviewText}
          value={reviewText}
          disabled
        />
      </div>
    );
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FEC80B'
        }
      }}
    >
      {addReviewComponent(auth, userReviewExists)}
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
              title={
                <Flex justify='space-between'>
                  <Typography.Text>{review.username}</Typography.Text>
                  <Typography.Text>
                    Created On: {review.created_at.toString().substring(0, 10)}
                  </Typography.Text>
                </Flex>
              }
              description={
                <Typography.Paragraph ellipsis={{ rows: 5, expandable: true }}>
                  {review.content}
                </Typography.Paragraph>
              }
            />
          </List.Item>
        )}
      />
    </ConfigProvider>
  );
}
