import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import { useState } from 'react';
import {
  Button,
  Menu,
  Input,
  Typography,
  ConfigProvider,
  Select,
  Image
} from 'antd';
import type { MenuProps, SelectProps } from 'antd';
import './Navbar.css';

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
            <Link to='/profile'>
              <Button type='text' className='menuButton'>
                <Typography.Text strong className='menuLink'>
                  Hi{' '}
                  {username.length > 7
                    ? username.substring(0, 8).concat('...')
                    : username}
                </Typography.Text>
              </Button>
            </Link>
          ),
          key: 'hi-username'
        },
        {
          label: (
            <Button type='link' onClick={handleSignout} className='menuButton'>
              <Typography.Text strong className='menuLink'>
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
              <Typography.Text strong className='menuLink'>
                Sign In
              </Typography.Text>
            </Link>
          ),
          key: '/sign-in'
        },
        {
          label: (
            <Link to='/sign-up'>
              <Typography.Text strong className='menuLink'>
                Join
              </Typography.Text>
            </Link>
          ),
          key: '/sign-up'
        }
      ];

  return (
    <div className='navbar'>
      <Link
        to='/'
        style={{
          textDecoration: 'none',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 5
        }}
      >
        <Image src='../logo.png' width={50} preview={false} />
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
        <div className='searchContainer'>
          <Input.Search
            className='search'
            placeholder='Book Title, Author, ISBN'
            size='large'
            onChange={handleInput}
            onSearch={onSearch}
            enterButton
          />
          {location.pathname === '/search' ? (
            <Select
              mode='multiple'
              className='fieldSelection'
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
      <Menu mode='horizontal' items={items} className='menu' disabledOverflow />
    </div>
  );
}

export default Navbar;
