import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button, ConfigProvider, Flex, List, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import useAuth from '../pages/UserAuth';
import {
  IReview,
  addReviewByISBN,
  deleteReview,
  editReview,
  fetchBookByISBN
} from '../services';
import styles from './ReviewBox.module.css';
import ShowUserAvatar from './ShowUserAvatar';

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
  const [renderToggle, setRenderToggle] = useState(false);

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
  }, [offset, limit, isbn, username, renderToggle]);

  const handleReviewText = (event: { target: { value: string } }) => {
    setReviewText(event.target.value);
  };

  const handleReviewAddSubmit = async () => {
    await addReviewByISBN(isbn as string, reviewText).finally(() => {
      setReviewText('');
      setRenderToggle(!renderToggle);
    });
  };

  const handleReviewEditSubmit = async () => {
    await editReview(isbn as string, username, reviewText).finally(() => {
      setReviewText('');
      setRenderToggle(!renderToggle);
    });
  };

  const deleteButton = async () => {
    await deleteReview(isbn as string, username).finally(() => {
      setRenderToggle(!renderToggle);
    });
  };

  const addReviewComponent = () => {
    if (auth && userReviewExists) {
      return (
        <div className={styles.addReviewContainer}>
          <Typography.Title level={2}>Edit Review: </Typography.Title>
          <TextArea
            placeholder='Edit your own review...'
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
          style={{ height: 200, resize: 'none' }}
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
      {addReviewComponent()}
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
              avatar={<ShowUserAvatar name={review.username} size={32} />}
              title={
                <Flex justify='space-between'>
                  {/* <Typography.Text>{review.username}</Typography.Text> */}
                  <Link to={`/profile/${review.username}`}>
                    <Typography.Text>{review.username}</Typography.Text>
                  </Link>
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
