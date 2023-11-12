import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import ShowUserAvatar from '../components/ShowUserAvatar.tsx';
import ShowProfile from './ShowProfile';
import useAuth from './UserAuth';

const { Content, Sider } = Layout;

function ShowProfileLayout(): JSX.Element {
  // `auth`: Represents the authentication status.
  // `username`: Represents the username associated with the authenticated user.
  // `handleSignout`: Function to handle the signout action.
  const { auth, username, handleSignout } = useAuth();
  return (
    <Layout style={{ background: 'none', padding: '0 50px' }}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />
      <Layout style={{ background: 'none', padding: '10px 0' }}>
        <Sider style={{ background: 'none', margin: '70px 20px' }}>
          <ShowUserAvatar />
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
          <ShowProfile />
        </Content>
      </Layout>
    </Layout>
  );
}
export default ShowProfileLayout;
