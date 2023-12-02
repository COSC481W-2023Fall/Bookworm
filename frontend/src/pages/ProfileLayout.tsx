import type { MenuProps } from 'antd';
import { Layout, Menu, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../components/Avatar';
import Navbar from '../components/Navbar';
import EditProfile from './EditProfile';
import Profile from './Profile';
import SetPassword from './SetPassword';
import useAuth from './UserAuth';

const { Title } = Typography;

const { Content, Sider } = Layout;

function ProfileLayout(): JSX.Element {
  // `auth`: Represents the authentication status.
  // `username`: Represents the username associated with the authenticated user.
  // `handleSignout`: Function to handle the signout action.
  const { auth, username, handleSignout } = useAuth();

  // 'current': Represents the current state and is initially set to '1' or 'selectedKey' in localStorage
  // 'setCurrent': Funciton to update the 'current' state
  const [current, setCurrent] = useState(
    () =>
      // Retrieve the saved key from localStorage, default to '1' if not found
      localStorage.getItem('selectedKey') || '1'
  );

  const [loading, setLoading] = useState(true); // New loading state

  const navigate = useNavigate();

  /**
   * Click even handler for the Menu component.
   * @param {Object} e - The click even object
   */
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  /**
   * Function that switches between components based on a given key.
   * @param {String} key - The key used to determine the component to render.
   * @return {JSX.Element | null}  The JSX representation of the selected component.
   */
  const componentsSwtich = (key: string) => {
    switch (key) {
      case '1':
        return <Profile />;
      case '2':
        return <EditProfile />;
      case '3':
        return <SetPassword />;
      case '4':
        navigate('/shelf'); // Redirect to the sign-in page
        break;
      default:
        break;
    }
  };

  // Menu items configuration for rendering a menu.Each item has a label and a key.
  const items: MenuProps['items'] = [
    {
      label: 'Profile',
      key: '1'
    },
    {
      label: 'Edit Profile',
      key: '2'
    },
    {
      label: 'Reset Password',
      key: '3'
    },
    {
      label: 'Bookshelf',
      key: '4'
    }
  ];

  // Save to localStorage only if the current key is not '4'
  useEffect(() => {
    if (current !== '4') {
      localStorage.setItem('selectedKey', current);
    }
  }, [current]);

  // Set loading to false once auth status is fetched
  useEffect(() => {
    setLoading(false);
  }, [auth]);
  return (
    <Layout style={{ background: 'none' }}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />
      {loading ? (
        // Display a loading spinner or message while auth status is being checked
        <div>Loading...</div>
      ) : auth ? (
        // { auth ? (
        <Layout style={{ background: 'none', padding: '10px 0' }}>
          <Sider style={{ background: 'none' }}>
            <UserAvatar />
            <Menu onClick={onClick} selectedKeys={[current]} items={items} />
          </Sider>

          <Content
            style={{
              margin: '0 16px',
              padding: '0',
              minHeight: 280,
              background: 'none',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            {componentsSwtich(current)}
          </Content>
        </Layout>
      ) : (
        <div style={{ margin: '70px 20px' }}>
          <Title level={2}>
            You need to sign in first to access the profile page.
          </Title>
          <Title level={2}>
            Click "Sign in" button in Navbar to go to the sign in page.
          </Title>
        </div>
      )}
    </Layout>
  );
}
export default ProfileLayout;
