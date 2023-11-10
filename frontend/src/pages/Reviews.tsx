import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { List } from 'antd';
import { IReview, fetchBookByISBN } from '../services';
import useAuth from './UserAuth';

type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';

export default function Reviews(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();
  const { isbn } = useParams<{ isbn: string }>();
  const [position] = useState<PaginationPosition>('bottom');
  const [align] = useState<PaginationAlign>('center');
  const [limit, _] = useState(5);
  const [offset, setOffset] = useState(0);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchReviews() {
      const book = await fetchBookByISBN(isbn!);

      const reviews = book?.reviews.sort((a, b) => a.created_at.getTime() - b.created_at.getTime()) ?? [];

      setReviews(reviews);
      setCount(reviews.length)
    }

    fetchReviews();
  }, [offset, limit]);

  /**
  return <div className={styles.homePage}>
    <Navbar auth={auth} username={username} handleSignout={handleSignout} />
    <h1>Reviews: {isbn} </h1>

    <ReviewPanel username="test" content="Deez" createdAt={new Date()} />
  </div>;
  */

  return (
    <div>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />
      <h1>Reviews: {isbn}</h1>
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
              /*avatar={
                <Image
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-S.jpg`}
                />
              }*/
              title={`${review.username} @ ${review.created_at}`}
              description={review.content}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
