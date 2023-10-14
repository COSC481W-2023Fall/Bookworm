import { Typography } from 'antd';
import Navbar from '../components/Navbar';
import Bookshelf from '../components/Bookshelf';

function Home(): JSX.Element {
  const tempBooks = [
    {
      isbn: '0156007754'
    },
    {
      isbn: '0765365278'
    },
    {
      isbn: '006112009X'
    },
    {
      isbn: '1846940583'
    },
    {
      isbn: '198481785X'
    }
  ];

  const blurb =
    'Meet "BookWorms," the ultimate haven for passionate readers and bibliophiles alike! BookWorms isn\'t just a book review application....';

  return (
    <div className='homePage'>
      <Navbar />
      <div className='content'>
        <Typography.Paragraph strong className='blurb'>
          {blurb}
        </Typography.Paragraph>
      </div>
      <Bookshelf shelfName='Book Shelf' books={tempBooks} />
      <Bookshelf shelfName='Recommendations' books={tempBooks} />
    </div>
  );
}

export default Home;
