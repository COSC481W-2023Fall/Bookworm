import Navbar from '../components/Navbar';
import ShelfPage from '../components/ShelfPage';
import styles from './Home.module.css';
import useAuth from './UserAuth';

function Shelf(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();
  return (
    <div className={styles.homePage}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />

      <ShelfPage />
    </div>
  );
}

export default Shelf;
