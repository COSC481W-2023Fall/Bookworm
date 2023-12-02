import { Avatar } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

type UserAvatarProps = {
  name?: string;
  size?: number;
};

const ShowUserAvatar: React.FC<UserAvatarProps> = ({ name, size }) => {
  // Get the first character of the username
  // If no name is provided to the component, use
  // the useParams hook to get the username from the route.
  // Else, use the username passed to the component
  let username: string | undefined;
  if (!name) {
    let params = useParams<{ username?: string }>();
    username = params.username;
  } else {
    username = name;
  }

  const firstCharacter: string | undefined = username
    ? username.charAt(0).toUpperCase()
    : undefined;

  let finalSize = size ?? 128;
  return (
    <Avatar
      size={finalSize}
      shape='square'
      style={{
        backgroundColor: '#fde3cf',
        color: '#f56a00',
        fontSize: `${finalSize / 2}px`
      }}
    >
      {firstCharacter}
    </Avatar>
  );
};

export default ShowUserAvatar;
