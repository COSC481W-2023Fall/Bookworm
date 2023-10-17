import React from 'react';
import { Image, List } from 'antd';


const books = [
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

const BrowsePage: React.FC = () => (
  <List
    itemLayout="horizontal"
    dataSource={books}
    renderItem={(book, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Image 
             src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
             
              />}
          title={<a href="https://ant.design">{book.isbn}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
);

export default BrowsePage;