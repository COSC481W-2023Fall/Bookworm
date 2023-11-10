// import { Layout } from 'antd';
// import UserAvatar from '../components/Avatar.tsx';
// import Navbar from '../components/Navbar';
// import Profile from './Profile';
// import useAuth from './UserAuth';
import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useParams } from 'react-router-dom';

// const { Content, Sider} = Layout;

// function ProfileLayout(): JSX.Element {

    // `auth`: Represents the authentication status.
    // `username`: Represents the username associated with the authenticated user.
    // `handleSignout`: Function to handle the signout action.
//     const { auth, username, handleSignout } = useAuth();


//     return (
//     <Layout style= {{background:'none', padding:'0 50px'}}>
//         <Navbar auth={auth} username={username} handleSignout={handleSignout} />
//         <Layout style = {{background:"none", padding: '10px 0'}}>
//             <Sider style = {{background:"none"}} >
//                 <UserAvatar />
//             </Sider>
//             <Content
//                 style={{
//                 margin: '0 16px',
//                 padding: '0',
//                 minHeight:280,
//                 background: 'none',
//                 justifyContent: 'center',
//                 textAlign: 'center'
//                 }}
//             >
//                 <Profile />

//             </Content>
//         </Layout>
//     </Layout>
//     );
// }

// export default ProfileLayout;

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
        const response = await fetch(`http://localhost:3001/api/getProfileData/${username}`);
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
  
    return (
      <div className="profile-container">
        <h1>Profile</h1>
        {profileData ? (
          <div className="profile-content">
            <p><strong>Gender:</strong> {profileData.gender}</p>
            <p><strong>Occupation:</strong> {profileData.occupation}</p>
            <p><strong>Favorite Book:</strong> {profileData.favoriteBook}</p>
            <p><strong>About me:</strong> {profileData.description}</p>
            <p><strong>Username:</strong> {profileData.username}</p>
          </div>
        ) : (
          <p>Loading profile data...</p>
        )}
      </div>
    );
  }
export default ShowProfile;
