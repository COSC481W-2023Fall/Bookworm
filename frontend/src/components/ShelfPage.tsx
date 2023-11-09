import { useEffect, useState } from 'react';
import { Tabs, List, Image } from 'antd';
import type { TabsProps } from 'antd';
import { Link } from 'react-router-dom';
import { fetchBookByISBN, fetchBookShelfs, IBook, IUser } from '../services';

export default function ShelfPage(): JSX.Element {
  const [user, setUser] = useState<IUser | null>(null);
  const [book, setBook] = useState<IBook | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);

  const readingShelf = user?.reading_bookshelf;

  const completedShelf = user?.completed_bookshelf;
  const droppedShelf = user?.dropped_bookshelf;
  const planToShelf = user?.plan_to_bookshelf;

  useEffect(() => {
    async function fetchBookShelf() {
      const res = await fetchBookShelfs();
      setUser(res);
    }

    fetchBookShelf();
  }, []);

  useEffect(() => {
    async function fetchBookInfo() {
      if (readingShelf != null) {
        const isbn = readingShelf.pop();
        const res = await fetchBookByISBN(isbn!);
        setBook(res);
      }
    }
    fetchBookInfo();
  }, [readingShelf, books]);

  useEffect(() => {
    async function addBookToArray() {
      const nextbooks = books.map((item) => item);
      nextbooks.push(book!);
      setBooks(nextbooks);
    }

    addBookToArray();
  }, [book]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Currently Reading',
      children: (
        <List
          itemLayout='horizontal'
          dataSource={readingShelf}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image
                    src={`https://covers.openlibrary.org/b/isbn/${item}-S.jpg`}
                  />
                }
                title={<Link to={`/book/${item}`}>{item}</Link>}
                description={`Author:${item}`}
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
          dataSource={completedShelf}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image
                    src={`https://covers.openlibrary.org/b/isbn/${item}-S.jpg`}
                  />
                }
                title={<Link to={`/book/${item}`}>{item}</Link>}
                description={`Author:${item}`}
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
          dataSource={droppedShelf}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image
                    src={`https://covers.openlibrary.org/b/isbn/${item}-S.jpg`}
                  />
                }
                title={<Link to={`/book/${item}`}>{item}</Link>}
                description={`Author:${item}`}
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
          dataSource={planToShelf}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Image
                    src={`https://covers.openlibrary.org/b/isbn/${item}-S.jpg`}
                  />
                }
                title={<Link to={`/book/${item}`}>{item}</Link>}
                description={`Author:${item}`}
              />
            </List.Item>
          )}
        />
      )
    }
  ];

  return <Tabs defaultActiveKey='1' items={items} type='card' />;
}
