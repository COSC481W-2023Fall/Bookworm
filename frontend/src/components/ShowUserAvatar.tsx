import { Avatar } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

const ShowUserAvatar: React.FC = () => {
  // Get the first character of the username
  // Use the useParams hook to get the username from the route
  const { username } = useParams<{ username?: string }>();
  const firstCharacter: string | undefined = username
    ? username.charAt(0).toUpperCase()
    : undefined;

  return (
    <Avatar
      size={128}
      shape='square'
      style={{ backgroundColor: '#fde3cf', color: '#f56a00', fontSize: '64px' }}
    >
      {firstCharacter}
    </Avatar>
  );
};

export default ShowUserAvatar;
