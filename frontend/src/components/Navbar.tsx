import { Link } from 'react-router-dom';
import { Menu, Input, Typography, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { Button } from 'antd';
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
            <Typography.Text strong className={styles.menuLink}>
              Hi {username}
            </Typography.Text>
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
      <Menu mode='horizontal' items={items} className={styles.menu} />
    </div>
  );
}

export default Navbar;
