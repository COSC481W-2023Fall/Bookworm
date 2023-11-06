import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import { useState } from 'react';
import { Button, Menu, Input, Typography, ConfigProvider, Select } from 'antd';
import type { MenuProps, SelectProps } from 'antd';
import styles from './Navbar.module.css';

interface NavbarProps {
  auth: boolean;
  username: string;
  handleSignout: () => void;
}

function Navbar({ auth, username, handleSignout }: NavbarProps): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFields: SelectProps['options'] = [
    {
      label: 'title',
      value: 'title'
    },
    {
      label: 'author',
      value: 'author'
    },
    {
      label: 'isbn',
      value: 'isbn'
    },
    {
      label: 'publisher',
      value: 'publisher'
    },
    {
      label: 'genres',
      value: 'genres'
    }
  ];
  const location = useLocation();

  const handleInput = (event: { target: { value: string } }) => {
    const text = event.target.value;
    setSearchText(text);
  };

  const onSearch = () => {
    navigate({
      pathname: '/search',
      search: createSearchParams({
        q: searchText,
        fields: searchParams.get('fields') || ''
      }).toString()
    });
  };

  const handleFields = (value: string[]) => {
    setSearchParams({
      q: searchParams.get('q') || '',
      fields: value.join(',')
    });
  };

  // If usersigned in, it displays a greeting with the username and a "Sign Out" button.
  // If not signed in, it displays "Sign In" and a "Sign Up" button.
  const items: MenuProps['items'] = auth
    ? [
        {
          label: (
            <Button type='text'>
              <Typography.Text strong className={styles.menuLink}>
                Hi {username}
              </Typography.Text>
            </Button>
          ),
          key: 'hi-username'
        },
        {
          label: (
            <Button type='link' onClick={handleSignout}>
              <Typography.Text strong className={styles.menuLink}>
                Sign Out
              </Typography.Text>
            </Button>
          ),
          key: '/sign-out'
        }
      ]
    : [
        {
          label: (
            <Link to='/sign-in'>
              <Typography.Text strong className={styles.menuLink}>
                Sign In
              </Typography.Text>
            </Link>
          ),
          key: '/sign-in'
        },
        {
          label: (
            <Link to='/sign-up'>
              <Typography.Text strong className={styles.menuLink}>
                Join
              </Typography.Text>
            </Link>
          ),
          key: '/sign-up'
        }
      ];

  return (
    <div className={styles.navbar}>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Typography.Title level={1} className='title'>
          BookWorm
        </Typography.Title>
      </Link>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FEC80B'
          }
        }}
      >
        <div className={styles.searchContainer}>
          <Input.Search
            className={styles.search}
            placeholder='Book Title, Author, ISBN'
            size='large'
            onChange={handleInput}
            onSearch={onSearch}
            enterButton
          />
          {location.pathname === '/search' ? (
            <Select
              mode='multiple'
              className={styles.fieldSelection}
              defaultValue={['title', 'author', 'isbn', 'publisher', 'genres']}
              options={searchFields}
              onChange={handleFields}
              placeholder='searching title, author, isbn, publisher, genres'
            />
          ) : (
            <div />
          )}
        </div>
      </ConfigProvider>
      <Menu mode='horizontal' items={items} className={styles.menu} />
    </div>
  );
}

export default Navbar;
