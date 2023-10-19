
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(res => {
        if (res.data.success) {
          setAuth(true);
          setUsername(res.data.name);
        } else {
          setAuth(false);
        }
      });
  }, []);

  const handleSignout = () => {
    axios.get('http://localhost:3001/sign-out')
      .then(res => {
        if (res.data.success) {
          location.reload();
        }
      })
      .catch(err => console.log(err));
  };

  return { auth, username, handleSignout };
};

export default useAuth;
