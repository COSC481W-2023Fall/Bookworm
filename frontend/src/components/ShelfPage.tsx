import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Currently Reading',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Completed',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Plan To Read',
    children: 'Content of Tab Pane 3',
  },
  {
    key: '4',
    label: 'Dropped',
    children: 'Content of Tab Pane 4',
  },
];

const ShelfPage: React.FC = () => 
<Tabs 
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
    type="card" />;

export default ShelfPage;