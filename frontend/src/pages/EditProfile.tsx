import { useState } from 'react';
import './EditProfile.css';
import useAuth from './UserAuth';

function EditProfile() {
  const { username: username1 } = useAuth();

  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [favoriteBook, setFavoriteBook] = useState('');
  const [description, setDescription] = useState('');
  const [username, setusername] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    try {
      if (username.trim() === '') {
        return alert('Username cannot be empty');
      }
      if (username.trim() !== username1) {
        return alert('Username is not correct');
      }
      const response = await fetch(
        'http://localhost:3001/api/saveProfileData',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            gender,
            occupation,
            favoriteBook,
            description,
            username
          })
        }
      );

      if (response.ok) {
        setIsSaved(true);
        // navigate(`/profile/${username}`);
        return alert('Edit profile sucessfully');
      } else {
        console.error('Failed to save profile data');
      }
    } catch (error) {
      console.error('Error while saving profile data:', error);
    }
  };

  return (
    <div className='user-info-edit'>
      <h1>User Info Edit</h1>
      <div className='form'>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="" disabled>--Please select gender--</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>

        <label>Occupation:</label>
        <input
          type='text'
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />

        <label>Favorite Book:</label>
        <input
          type='text'
          value={favoriteBook}
          onChange={(e) => setFavoriteBook(e.target.value)}
        />

        <label>About me:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Username Confirmation:</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />

        <button className='editPageButton' onClick={handleSave}>
          Save & Show
        </button>
        {isSaved}
      </div>
    </div>
  );
}

export default EditProfile;
