import { Descriptions, DescriptionsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfileGet } from '../services';

interface ProfileData {
  gender: string;
  occupation: string;
  favoriteBook: string;
  description: string;
  username: string;
}

function ShowProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  // Use the useParams hook to get the username from the route
  const { username } = useParams();

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfileData = async () => {
      try {
        //   const response = await fetch(`http://localhost:3001/getProfileData/${username}`);
        const response = await fetchProfileGet(username!);
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
  }, [username]);

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
    <div className='profile-container'>
      {profileData ? (
        <>
        <h1>{username}</h1>
        <Descriptions
          column={1}
          items={items}
          contentStyle={{ font: '1.3em inter', textAlign: 'left' }}
          labelStyle={{ color: 'black', font: 'bold 1.3em inter' }}
        />
        </>
      ) : (
        <>
        <h1 style={{fontSize: '100px', fontWeight: 'bold' }}>404</h1>
        <p style={{fontSize: '20px'}}>Sorry, the user <span style={{ color: 'red', fontWeight: 'bold' }}>{username}</span> does not exist</p>
        </>
      )}
    </div>
  );
}
export default ShowProfile;
