import { Space, Radio, Select, ConfigProvider } from 'antd';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchDisplay from '../components/SearchDisplay';
import styles from './Home.module.css';
import useAuth from './UserAuth';

function Search(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (value: string) => {
    setSearchParams({
      q: searchParams.get('q') || '',
      fields: searchParams.get('fields') || '',
      sort: value,
      order: searchParams.get('order') || ''
    });
  };

  const handleOrder = (event) => {
    setSearchParams({
      q: searchParams.get('q') || '',
      fields: searchParams.get('fields') || '',
      sort: searchParams.get('sort') || '',
      order: event.target.value
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
            defaultValue='title'
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
            defaultValue='asc'
            onChange={handleOrder}
          />
        </Space>
      </ConfigProvider>

      <SearchDisplay />
    </div>
  );
}

export default Search;
