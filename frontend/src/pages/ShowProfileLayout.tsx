import { Descriptions, DescriptionsProps, Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ShowUserAvatar from '../components/ShowUserAvatar.tsx';
import useAuth from './UserAuth';
import { fetchProfileGet } from '../services/index.ts';

const { Content, Sider } = Layout;

interface ProfileData {
  gender: string;
  occupation: string;
  favoriteBook: string;
  description: string;
  username: string;
}

function ShowProfileLayout(): JSX.Element {
  // `auth`: Represents the authentication status.
  // `username`: Represents the username associated with the authenticated user.
  // `handleSignout`: Function to handle the signout action.
  const { auth, username, handleSignout } = useAuth();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // Use the useParams hook to get the username from the route
  const profileUsername = useParams().username;

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfileData = async () => {
      try {
        //   const response = await fetch(`http://localhost:3001/getProfileData/${username}`);
        const response = await fetchProfileGet(profileUsername!);
        if (response.status === 200) {
          const { data } = response;
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error while fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [profileUsername]);

  const items: DescriptionsProps['items'] = [
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
    <Layout style={{ background: 'none' }}>
      <Navbar auth={auth} username={username} handleSignout={handleSignout} />
      <Layout style={{ background: 'none', padding: '10px 0' }}>
        {profileData ? (
          <Sider style={{ background: 'none', margin: '70px 20px' }}>
            <ShowUserAvatar />
          </Sider>
        ) : (
          <div />
        )}
        <Content
          style={{
            margin: '0 16px',
            padding: '0',
            minHeight: 280,
            background: 'none',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <div className='profile-container'>
            {profileData ? (
              <>
                <h1>{profileUsername}</h1>
                <Descriptions
                  column={1}
                  items={items}
                  contentStyle={{ font: '1.3em inter', textAlign: 'left' }}
                  labelStyle={{ color: 'black', font: 'bold 1.3em inter' }}
                />
              </>
            ) : (
              <>
                <h1 style={{ fontSize: '100px', fontWeight: 'bold' }}>404</h1>
                <p style={{ fontSize: '20px' }}>
                  Sorry, the user{' '}
                  <span style={{ color: 'red', fontWeight: 'bold' }}>
                    {profileUsername}
                  </span>{' '}
                  does not exist
                </p>
              </>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
export default ShowProfileLayout;
