import { useEffect, useState } from 'react';
import { Image, List } from 'antd';
import { useSearchParams, Link } from 'react-router-dom';
import { IBook, searchBookCount, searchBooks } from '../services';

type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';

export default function SearchPage() {
  const [position] = useState<PaginationPosition>('bottom');
  const [align] = useState<PaginationAlign>('center');
  const [limit, _] = useState(5);
  const [offset, setOffset] = useState(0);
  const [books, setBooks] = useState<IBook[]>([]);
  const [count, setCount] = useState(0);
  const [searchParams, _setSearchParams] = useSearchParams();

  useEffect(() => {
    async function fetchCount() {
      const res = await searchBookCount(searchParams.get('q') || '');
      setCount(res);
    }

    fetchCount();
  }, [searchParams]);

  useEffect(() => {
    async function fetchBooks() {
      const res = await searchBooks(searchParams.get('q') || '', offset, limit);
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
              <Image
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-S.jpg`}
              />
            }
            title={<Link to={`/book/${book.isbn}`}>{book.title}</Link>}
            description={`Author:${book.author}`}
          />
        </List.Item>
      )}
    />
  );
}
