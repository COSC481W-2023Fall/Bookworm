import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space, Typography } from 'antd';

interface DropDownProps {
  username: string;
  handleSignout: () => void;
}
function DropdownMenu({ username, handleSignout }: DropDownProps): JSX.Element {
  const items: MenuProps['items'] = [
    {
      label: <Link to='/profile'>1st menu item</Link>,
      key: '0'
    },
    {
      label: <Link to='/shelf'>Book Shelves</Link>,
      key: '1'
    },
    {
      type: 'divider'
    },
    {
      label: (
        <Button type='link' onClick={handleSignout} className='menuButton'>
          <Typography.Text strong className='menuLink'>
            Sign Out
          </Typography.Text>
        </Button>
      ),
      key: '3'
    }
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Space onClick={(e) => e.preventDefault()}>
        <Typography.Text strong className='menuLink'>
          Hi{' '}
          {username.length > 7
            ? username.substring(0, 8).concat('...')
            : username}
        </Typography.Text>
        <DownOutlined />
      </Space>
    </Dropdown>
  );
}
export default DropdownMenu;
