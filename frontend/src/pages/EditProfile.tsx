import React, { useState } from 'react';
// import Particles from 'react-tsparticles';
import './EditProfile.css'; 

// function Fireworks() {
//   const particlesConfig = {
//     particles: {
//       number: {
//         value: 100, 
//       },
//       color: {
//         value: '#00CC66', 
//       },
//       shape: {
//         type: 'circle', 
//       },
//       size: {
//         value: 5, 
//       },
//       move: {
//         enable: true,
//         speed: 3, 
//       },
//     },
//   };

//   return (
//     <Particles className="fireworks" params={particlesConfig} />
//   );
// }

function EditProfile() {
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [favoriteBook, setFavoriteBook] = useState('');
  const [description, setDescription] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
   
    setIsSaved(true);

    
    setGender('');
    setOccupation('');
    setFavoriteBook('');
    setDescription('');
  };

  return (
    <div className="user-info-edit">
      <h1>User Info Edit</h1>
      <div className="form">
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Occupation:</label>
        <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />

        <label>Favorite Book:</label>
        <input type="text" value={favoriteBook} onChange={(e) => setFavoriteBook(e.target.value)} />

        <label>About me:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <button onClick={handleSave}>Save</button>
        {isSaved}
        {/* {isSaved && <Fireworks />} */}
      </div>
    </div>
  );
}

export default EditProfile;
