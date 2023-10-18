import Navbar from '../components/Navbar';
import BrowsePage from '../components/BrowsePage';
import styles from './Home.module.css';

function Browse(): JSX.Element {
  return (
    <div className={styles.homePage}>
      <Navbar />

      <BrowsePage />
    </div>
  );
}

export default Browse;
