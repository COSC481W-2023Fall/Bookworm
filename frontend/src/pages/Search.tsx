import Navbar from '../components/Navbar';
import SearchDisplay from '../components/SearchDisplay';
import styles from './Home.module.css';
import useAuth from './UserAuth';

function Search(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();
  return (
    <div className={styles.homePage}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />

      <SearchDisplay />
    </div>
  );
}

export default Search;
