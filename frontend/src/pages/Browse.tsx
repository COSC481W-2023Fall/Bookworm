import Navbar from '../components/Navbar';
import BrowsePage from '../components/BrowsePage';
import styles from './Home.module.css';
import useAuth from './UserAuth';

function Browse(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();
  return (
    <div className={styles.homePage}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />

      <BrowsePage />
    </div>
  );
}

export default Browse;
