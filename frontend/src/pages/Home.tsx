import React from 'react';
import Navbar from '../components/navbar';
import Bookshelf from '../components/Bookshelf';
import { Typography } from 'antd';

const Home: React.FC = () => {
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

  return (
    <div className='homePage'>
      <Navbar />
      <div className='content'>
        <Typography.Paragraph strong className='blurb'>
          Meet "BookWorms," the ultimate haven for passionate readers and
          bibliophiles alike! BookWorms isn't just a book review application....
        </Typography.Paragraph>
      </div>
      <Bookshelf shelfName={'Book Shelf'} books={tempBooks} />
      <Bookshelf shelfName={'Recommendations'} books={tempBooks} />
    </div>
  );
};

export default Home;
