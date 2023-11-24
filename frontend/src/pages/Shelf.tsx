import { Typography } from 'antd';
import Navbar from '../components/Navbar';
import ShelfPage from '../components/ShelfPage';
import styles from './Home.module.css';
import useAuth from './UserAuth';
const { Title } = Typography;

function Shelf(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();
  if (!auth) {
    return (
      <div className={styles.homePage}>
        <Navbar auth={auth} username={username} handleSignout={handleSignout} />

        <div style={{margin: '100px 20px'}}>
          <Title level={2}>You need to sign in first to access the bookshelf page</Title>
      </div>
      </div>
    );
  }
  return (
    <div className={styles.homePage}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />

      <ShelfPage />
    </div>
  );
}

export default Shelf;
