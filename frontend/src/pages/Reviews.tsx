import Navbar from '../components/Navbar';
import styles from './Reviews.module.css';
import useAuth from './UserAuth';

export default function Reviews(): JSX.Element {
  const { auth, username, handleSignout } = useAuth();

  return <div className={styles.homePage}>
    <Navbar auth={auth} username={username} handleSignout={handleSignout} />
    <h1>Reviews</h1>
  </div>;
}
