import React, { useState } from 'react';
import { Image, List  } from 'antd';



type PaginationPosition = 'top' | 'bottom' | 'both';

type PaginationAlign = 'start' | 'center' | 'end';

const books = [
  {
    isbn: '0156007754',
    author:'tasha',
    pagecount:'44'
  },
  {
    isbn: '0765365278',
    author:'tasha',
    pagecount:'44'
  },
  {
    isbn: ' 0060883286',
    author:'tasha',
    pagecount:'44'
  },
  {
    isbn: '1939905214',
    author:'tasha',
    pagecount:'44'
  },
  {
    isbn: '198481785X',
    author:'tasha',
    pagecount:'44'
  }
];


const BrowsePage: React.FC = () => {
  const [position] = useState<PaginationPosition>('bottom');
  const [align] = useState<PaginationAlign>('center');

  return (
    <>
     
      <List
        pagination={{ 
          position,
          align,
          pageSize: 5,
         }}
        dataSource={books}
        renderItem={(book) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Image src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-S.jpg`} />
              }
              title={<a href="https://ant.design">{book.isbn}</a>} // change href to book page out of scope
              description={'Author:'+ book.author}
              
             
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default BrowsePage;

