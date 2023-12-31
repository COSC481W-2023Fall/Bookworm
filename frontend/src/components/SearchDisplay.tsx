import { useEffect, useState } from 'react';
import { List, Image } from 'antd';
import { useSearchParams, Link } from 'react-router-dom';
import { IBook, searchBookCount, searchBooks } from '../services';

type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';

export default function SearchDisplay() {
  const [position] = useState<PaginationPosition>('bottom');
  const [align] = useState<PaginationAlign>('center');
  const [limit, _] = useState(5);
  const [offset, setOffset] = useState(0);
  const [books, setBooks] = useState<IBook[]>([]);
  const [count, setCount] = useState(0);
  const [searchParams, _setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchCount() {
      const res = await searchBookCount(
        searchParams.get('q') || '',
        searchParams.get('fields') || ''
      );
      setCount(res);
    }

    fetchCount();
  }, [searchParams]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await searchBooks(
        searchParams.get('q') || '',
        searchParams.get('fields') || '',
        offset,
        limit,
        searchParams.get('sort') || '',
        searchParams.get('order') || ''
      );
      setBooks(res);
    }

    fetchBooks();
  }, [searchParams, offset, limit]);

  return (
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
      dataSource={books}
      renderItem={(book) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Link to={`/book/${book.isbn}`}>
                <Image
                  preview={false}
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-S.jpg?default=false`}
                  fallback='../image_not_available.png'
                  width={40}
                />
              </Link>
            }
            title={<Link to={`/book/${book.isbn}`}>{book.title}</Link>}
            description={
              <div>
                Author: {book.author}
                <br />
                Publisher: {book.publisher}
                <br />
                Publication Date:{' '}
                {book.publication_date.toString().substring(0, 10)}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
}
