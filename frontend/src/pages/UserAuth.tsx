import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchHome, fetchSignOut } from '../services/index';

const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchHome();
        console.log(res);
        if (res.data.success) {
          setAuth(true);
          setUsername(res.data.name);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetchSignOut();
      if (res.data.success) {
        location.reload();
      }
    } catch (error) {
      console.error('Error handling sign out:', error);
    }
  };

  return { auth, username, handleSignout };
};

export default useAuth;
