import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Menu,
  Input,
  Typography,
  ConfigProvider,
  Select,
  Image
} from 'antd';
import type { MenuProps, SelectProps } from 'antd';
import './Navbar.css';
import DropdownMenu from './dropDown';

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

  useEffect(() => {
    setSearchText(searchParams.get('q') || '');
  }, [searchParams]);

  const handleInput = (event: { target: { value: string } }) => {
    const text = event.target.value;
    setSearchText(text);
  };

  const onSearch = () => {
    navigate({
      pathname: '/search',
      search: createSearchParams({
        q: searchText,
        fields: searchParams.get('fields') || '',
        sort: searchParams.get('sort') || '',
        order: searchParams.get('order') || ''
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
            <DropdownMenu username={username} handleSignout={handleSignout} />
          ),
          key: 'hi-username'
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
            value={searchText}
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
      <Menu
        mode='horizontal'
        items={items}
        className='menu'
        selectable={false}
        disabledOverflow
      />
    </div>
  );
}

export default Navbar;
