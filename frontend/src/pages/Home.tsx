import { Typography } from 'antd';
import Navbar from '../components/Navbar';
import Bookshelf from '../components/Bookshelf';
import styles from './Home.module.css';
import { useState, useEffect } from 'react'
import axios from 'axios'


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



  const onSearch = () => {};


  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');
  // const [message, setMessage] = useState('');

  axios.defaults.withCredentials = true;
  
  // this useEffect hook is responsible for fetching user authentication information from the server 
  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(res => {
        if (res.data.success) {
          setAuth(true);
          setUsername(res.data.name);
        } else {
          setAuth(false);
        }
      });
  }, []);

  // handle sign-out procedure by sending an HTTP request to the 'sign-out' endpoint on the server 
  // and refreshing the page upon receiving information.
  const handleSignout = () => {
    axios.get('http://localhost:3000/sign-out')
      .then(res => {
        if (res.data.success) {
          location.reload(); 
        }
      })
      .catch(err => console.log(err));
  };


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
