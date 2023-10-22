import { Typography } from 'antd';
import Navbar from '../components/Navbar';
import Bookshelf from '../components/Bookshelf';
import styles from './Home.module.css';
import useAuth from './UserAuth';

function Home(): JSX.Element {
  // Temporary book retrieval for testign the bookshelf component.
  const shelf1 = [
    {
      isbn: '0156007754'
    },
    {
      isbn: '0765365278'
    },
    {
      isbn: ' 0060883286'
    },
    {
      isbn: '1939905214'
    },
    {
      isbn: '198481785X'
    }
  ];
  const shelf2 = [
    {
      isbn: '0670826901'
    },
    {
      isbn: '1324093021'
    },
    {
      isbn: '0593466349'
    }
  ];

  const blurb = `Welcome to Bookworm, the ultimate haven for passionate readers and bibliophiles alike! 
    Dive into a vibrant community of book enthusiasts and bibliophiles as you embark on a literary journey like no other. 
    Bookworm isn't just a social media app; it's a sanctuary for readers, a digital haven for bookworms of all kinds.`;

  // TODO: Commented-out as it was preventing TypeScript compilation. Could use for search functionality?
  // const onSearch = () => {};

  // const { auth, username, handleSignout } = useAuth();
  const { auth, username, handleSignout } = useAuth();
  return (
    <div className={styles.homePage}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />
      <div className={styles.content}>
        <Typography.Paragraph strong className={styles.blurb}>
          {blurb}
        </Typography.Paragraph>
      </div>
      <Bookshelf shelfName='Book Shelf' books={shelf1} />
      <Bookshelf shelfName='Recommendations' books={shelf2} />
    </div>
  );
}

export default Home;
