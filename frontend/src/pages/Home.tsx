import { Typography } from 'antd';
import Navbar from '../components/Navbar';
import Bookshelf from '../components/Bookshelf';
import styles from './Home.module.css';
import useAuth from './UserAuth';

function Home(): JSX.Element {
  // Temporary book retrieval for testign the bookshelf component.
  const shelf1 = [
    {
      isbn: '0140119507' // If the River Was Whiskey
    },
    {
      isbn: '0553575651' // Liveship Traders 3
    },
    {
      isbn: '0156007754' // Blindness
    },
    {
      isbn: '849759682X' // Dune
    },
    {
      isbn: '006112009X' // One Hundred Years of Solitude
    }
  ];

  const blurb = `Welcome to Bookworm, the ultimate haven for passionate readers and bibliophiles alike! 
    Dive into a vibrant community of book enthusiasts and bibliophiles as you embark on a literary journey like no other. 
    Bookworm isn't just a social media app; it's a sanctuary for readers, a digital haven for bookworms of all kinds.`;

  const { auth, username, handleSignout } = useAuth();
  return (
    <div className={styles.homePage}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />
      <div className={styles.content}>
        <Typography.Paragraph strong className={styles.blurb}>
          {blurb}
        </Typography.Paragraph>
      </div>
      <Bookshelf shelfName='Our Picks' books={shelf1} />
    </div>
  );
}

export default Home;
