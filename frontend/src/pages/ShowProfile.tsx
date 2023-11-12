import { Descriptions, DescriptionsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        const response = await fetch(
          `http://localhost:3001/api/getProfileData/${username}`
        );
        if (response.ok) {
          const data = await response.json();
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
      label: 'Occupattion',
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
      <h1>{username}</h1>
      {profileData ? (
        <Descriptions
          column={1}
          items={items}
          contentStyle={{ font: '1.3em inter', textAlign: 'left' }}
          labelStyle={{ color: 'black', font: 'bold 1.3em inter' }}
        />
      ) : (
        // <div className='profile-content'>
        //   <p>
        //     <strong>Gender:</strong> {profileData.gender}
        //   </p>
        //   <p>
        //     <strong>Occupation:</strong> {profileData.occupation}
        //   </p>
        //   <p>
        //     <strong>Favorite Book:</strong> {profileData.favoriteBook}
        //   </p>
        //   <p>
        //     <strong>About me:</strong> {profileData.description}
        //   </p>
        //   <p>
        //     <strong>Username:</strong> {profileData.username}
        //   </p>
        // </div>
        <p>Loading profile data...</p>
      )}
    </div>
  );
}
export default ShowProfile;
