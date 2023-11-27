import { Avatar } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

type UserAvatarProps = {
  name?: string
}

const ShowUserAvatar: React.FC<UserAvatarProps> = ({ name }) => {
  // Get the first character of the username
  // If no name is provided to the component, use
  // the useParams hook to get the username from the route.
  // Else, use the username passed to the component
  let username: string | undefined;
  if (!name) {
    let params = useParams<{ username?: string }>();
    username = params.username;
  }
  else {
    username = name;
  }
  
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
