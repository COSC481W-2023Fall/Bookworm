import { Link } from 'react-router-dom';
import { Menu, Input, Typography, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import styles from './Navbar.module.css';

function Navbar(): JSX.Element {
  const onSearch = () => {};

  const items: MenuProps['items'] = [
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
          onSearch={onSearch}
          enterButton
        />
      </ConfigProvider>
      <Menu mode='horizontal' items={items} className={styles.menu} />
    </div>
  );
}

export default Navbar;
