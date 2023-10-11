import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Input, Typography } from 'antd';
import type { MenuProps } from 'antd';


const Navbar: React.FC = () => {

  const onSearch = () => {}

  const items: MenuProps['items'] = [
    {
      label: <Link to={"/sign-in"}><Typography.Text strong style={{fontSize: '1.5rem'}}>Sign In</Typography.Text></Link>,
      key: '/sign-in'
    },
    {
      label: <Link to={"/sign-up"}><Typography.Text strong style={{fontSize: '1.5rem'}}>Join</Typography.Text></Link>,
      key: '/sign-up'
    },
  ];

  return (
    <div className='navbar'>
      <Typography.Title level={1} className='title'>BookWorms</Typography.Title>
      <Input.Search className="search" placeholder="Book Title, Author, ISBN" size='large' onSearch={onSearch} enterButton />
      <Menu mode='horizontal' items={items} style={{borderBottom: "none", lineHeight:"0px", background:"none"}}></Menu>
    </div>
  );
};

export default Navbar;