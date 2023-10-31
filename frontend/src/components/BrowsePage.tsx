import { useEffect, useState } from 'react';
import { Image, List } from 'antd';
import { IBook, getBookCount, paginateBooks } from '../services';

type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';

export default function BrowsePage() {
  const [position] = useState<PaginationPosition>('bottom');
  const [align] = useState<PaginationAlign>('center');
  const [limit, _] = useState(5);
  const [offset, setOffset] = useState(0);
  const [books, setBooks] = useState<IBook[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchBooks() {
      const res = await paginateBooks(offset, limit);
      setBooks(res);
    }

    fetchBooks();
  }, [offset, limit]);

  useEffect(() => {
    async function fetchCount() {
      const res = await getBookCount();
      setCount(res);
    }

    fetchCount();
  });

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
            title={<a href='https://ant.design'>{book.title}</a>} // change href to book page out of scope
            description={`Author:${book.author}`}
          />
        </List.Item>
      )}
    />
  );
}
   