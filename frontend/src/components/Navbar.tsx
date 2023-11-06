import type { MenuProps } from 'antd';
import { Button, ConfigProvider, Input, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

interface NavbarProps {
  auth: boolean;
  username: string;
  handleSignout: () => void;
}

function Navbar({ auth, username, handleSignout }: NavbarProps): JSX.Element {
  // If usersigned in, it displays a greeting with the username and a "Sign Out" button.
  // If not signed in, it displays "Sign In" and a "Sign Up" button.
  const items: MenuProps['items'] = auth
    ? [
        {
          label: (
            <Link to="Profile">
            <Button type='text'>
              <Typography.Text strong className={styles.menuLink}>
                Hi {username}
              </Typography.Text>
            </Button>
            </Link>
          ),
          key: 'hi-username'
        },
        {
          label: (
            <Link to='/profile'>
              <Typography.Text strong className={styles.menuLink}>
                Profile
              </Typography.Text>
            </Link>
          ),
          key: '/profile'
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
      <Typography.Title level={1} className='title'>
        BookWorm
      </Typography.Title>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FEC80B'
          }
        }}
      >
        <Input.Search
          className={styles.search}
          placeholder='Book Title, Author, ISBN'
          size='large'
          // onSearch={onSearch}
          enterButton
        />
      </ConfigProvider>
      <Menu mode='horizontal' items={items} className={styles.menuLink} />
      {/* <Menu mode='inline' items={items} className={styles.menu} /> */}
    </div>
  );
}

export default Navbar;
