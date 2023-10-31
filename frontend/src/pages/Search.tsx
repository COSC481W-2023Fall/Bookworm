import Navbar from '../components/Navbar';
import SearchPage from '../components/SearchPage';
import styles from './Home.module.css';
import useAuth from './UserAuth';

function Search(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();
  return (
    <div className={styles.homePage}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />

      <SearchPage />
    </div>
  );
}

export default Search;
