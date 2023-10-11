import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

interface BookType {
  isbn: string;
}

interface BookshelfProps {
  shelfName: string,
  books: BookType[],
}


const Bookshelf: React.FC<BookshelfProps> = ({ shelfName, books }) => {
  return (
    <div className='bookshelf'>
      <span className='shelf-title'>
        <Typography.Title level={2} > { shelfName } </Typography.Title>
        <Link to={"/browse"} style={{textDecoration: 'none'}}><Typography.Text style={{fontSize: '1rem'}}> View All </Typography.Text></Link>
      </span>
      <ul className='book-list'>
        {
          books.map((book) => {
            return(
              <li key={book.isbn}><img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} /></li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default Bookshelf;