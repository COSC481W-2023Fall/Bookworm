import { Descriptions, DescriptionsProps, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { fetchProfileGet, fetchUserEmail } from '../services';
import useAuth from './UserAuth';

const { Title } = Typography;

export interface ProfileData {
  gender: string;
  occupation: string;
  favoriteBook: string;
  description: string;
}

function Profile(): JSX.Element {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const { username } = useAuth();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfileData = async () => {
      try {
        console.log(username);
        //   const response = await fetch(`http://localhost:3001/getProfileData/${username}`);
        const response = await fetchProfileGet(username);
        console.log('response.ok = ', response.status === 200);
        if (response.status === 200) {
          const { data } = response;
          console.log('data', data);
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error while fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [username]);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await fetchUserEmail();
        setEmail(res.data.email);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };
    fetchEmail();
  }, []);

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Username',
      children: username
    },
    {
      key: '2',
      label: 'Email',
      children: email
    }
  ];

  const items1: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Gender',
      children: profileData?.gender
    },
    {
      key: '2',
      label: 'Occupation',
      children: profileData?.occupation
    },
    {
      key: '3',
      label: 'Favorite Book',
      children: profileData?.favoriteBook
    },
    {
      key: '4',
      label: 'About me',
      children: profileData?.description
    }
  ];

  return (
    <div>
      <Space direction='horizontal'>
        <Title level={2}>{username}</Title>
      </Space>
      <Descriptions
        items={items}
        contentStyle={{ font: '1.3em inter', textAlign: 'left' }}
        labelStyle={{ color: 'black', font: 'bold 1.3em inter' }}
      />
      <h2>
        <br />
        The following information is public and can be accessed by anyone{' '}
      </h2>
      <Descriptions
        column={1}
        items={items1}
        contentStyle={{ font: '1.3em inter', textAlign: 'left' }}
        labelStyle={{ color: 'black', font: 'bold 1.3em inter' }}
      />
    </div>
  );
}

export default Profile;
