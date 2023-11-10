import { useEffect, useState, useRef } from 'react';
import { Tabs, List, Image } from 'antd';
import type { TabsProps } from 'antd';
import { Link } from 'react-router-dom';
import { fetchBookShelfs, IBook, IUser, searchBooks } from '../services';

export default function ShelfPage(): JSX.Element {
  const [user, setUser] = useState<IUser | null>(null);

  const [readingBooks, setRBooks] = useState<IBook[]>([]);
  const [completedBooks, setCBooks] = useState<IBook[]>([]);
  const [drppedBooks, setDBooks] = useState<IBook[]>([]);
  const [plannedBooks, setPBooks] = useState<IBook[]>([]);
  const readingShelf = user?.reading_bookshelf;
  const completedShelf = user?.completed_bookshelf;
  const droppedShelf = user?.dropped_bookshelf;
  const planToShelf = user?.plan_to_bookshelf;
  const initialized = useRef(false);

  useEffect(() => {
    async function fetchBookShelf() {
      const res = await fetchBookShelfs();
      setUser(res);
    }

    if (!initialized.current) {
      initialized.current = true;

      fetchBookShelf();
    }
  }, []);

  useEffect(() => {
    async function fetchbook() {
      if (readingShelf) {
        const res = await searchBooks(
          readingShelf.join('|'),
          'isbn',
          0,
          readingShelf.length
        );
        setRBooks(res);
      }
      if (completedShelf) {
        const res = await searchBooks(
          completedShelf.join('|'),
          'isbn',
          0,
          completedShelf.length
        );
        setCBooks(res);
      }
      if (droppedShelf) {
        const res = await searchBooks(
          droppedShelf.join('|'),
          'isbn',
          0,
          droppedShelf.length
        );
        setDBooks(res);
      }
      if (planToShelf) {
        const res = await searchBooks(
          planToShelf.join('|'),
          'isbn',
          0,
          planToShelf.length
        );
        setPBooks(res);
      }
    }
    fetchbook();
  }, [readingShelf, completedShelf]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Currently Reading',
      children: (
        <List
          itemLayout='horizontal'
          dataSource={readingBooks}
          renderItem={(bookr) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image
                    src={`https://covers.openlibrary.org/b/isbn/${bookr.isbn}-S.jpg`}
                  />
                }
                title={<Link to={`/book/${bookr.isbn}`}>{bookr.title}</Link>}
                description={`Author:${bookr.author}`}
              />
            </List.Item>
          )}
        />
      )
    },
    {
      key: '2',
      label: 'Completed',
      children: (
        <List
          itemLayout='horizontal'
          dataSource={completedBooks}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image
                    src={`https://covers.openlibrary.org/b/isbn/${item.isbn}-S.jpg`}
                  />
                }
                title={<Link to={`/book/${item.isbn}`}>{item.title}</Link>}
                description={`Author:${item.author}`}
              />
            </List.Item>
          )}
        />
      )
    },
    {
      key: '3',
      label: 'dropped',
      children: (
        <List
          itemLayout='horizontal'
          dataSource={drppedBooks}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image
                    src={`https://covers.openlibrary.org/b/isbn/${item.isbn}-S.jpg`}
                  />
                }
                title={<Link to={`/book/${item.isbn}`}>{item.title}</Link>}
                description={`Author:${item.author}`}
              />
            </List.Item>
          )}
        />
      )
    },
    {
      key: '4',
      label: 'Plan To Read',
      children: (
        <List
          itemLayout='horizontal'
          dataSource={plannedBooks}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image
                    src={`https://covers.openlibrary.org/b/isbn/${item.isbn}-S.jpg`}
                  />
                }
                title={<Link to={`/book/${item.isbn}`}>{item.title}</Link>}
                description={`Author:${item.author}`}
              />
            </List.Item>
          )}
        />
      )
    }
  ];

  return <Tabs defaultActiveKey='1' items={items} type='card' />;
}
