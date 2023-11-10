import { Avatar } from 'antd';
import React from 'react';
import useAuth from '../pages/UserAuth';

const UserAvatar: React.FC = () => {
  // Get the first character of the username
    const { username } = useAuth();
    const firstCharacter = username.charAt(0).toUpperCase();

    return (
    <Avatar size={128} shape="square" style={{ backgroundColor: '#fde3cf', color: '#f56a00', fontSize: '64px' }}>
        {firstCharacter}
    </Avatar>
    );
};

export default UserAvatar;
