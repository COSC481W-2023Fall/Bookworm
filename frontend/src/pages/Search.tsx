import { Space, Radio, Select, ConfigProvider, RadioChangeEvent } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchDisplay from '../components/SearchDisplay';
import styles from './Home.module.css';
import useAuth from './UserAuth';

function Search(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState('title');
  const [order, setOrder] = useState('asc');

  const handleSort = (value: string) => {
    setSort(value);
    setSearchParams({
      q: searchParams.get('q') || '',
      fields: searchParams.get('fields') || '',
      sort: value,
      order: searchParams.get('order') || ''
    });
  };

  const handleOrder = ({ target: { value } }: RadioChangeEvent) => {
    setOrder(value);
    setSearchParams({
      q: searchParams.get('q') || '',
      fields: searchParams.get('fields') || '',
      sort: searchParams.get('sort') || '',
      order: value
    });
  };

  return (
    <div className={styles.homePage}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FEC80B'
          }
        }}
      >
        <Space style={{ alignItems: 'center', justifyContent: 'center' }}>
          <p>
            <b>Sort By:</b>
          </p>
          <Select
            defaultValue={sort}
            style={{ width: 150 }}
            options={[
              { value: 'title', label: 'Title' },
              { value: 'author', label: 'Author' },
              { value: 'publisher', label: 'Publisher' },
              { value: 'genres', label: 'Genres' },
              { value: 'page_count', label: 'Page Count' },
              { value: 'publication_date', label: 'Publication Date' }
            ]}
            onChange={handleSort}
          />
          <Radio.Group
            options={[
              { label: 'Ascending', value: 'asc' },
              { label: 'Descending', value: 'desc' }
            ]}
            optionType='button'
            buttonStyle='solid'
            defaultValue={order}
            onChange={handleOrder}
          />
        </Space>
      </ConfigProvider>

      <SearchDisplay />
    </div>
  );
}

export default Search;
