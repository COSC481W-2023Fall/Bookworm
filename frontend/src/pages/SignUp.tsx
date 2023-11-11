// Import necessary libraries
import React, { useState } from 'react';
import './signup-styles.css';
import { submitRegistrationData } from '../services';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await submitRegistrationData<typeof formData>(formData);
      alert(response.data.message);
    } catch (error) {
      alert('Registration failed. User may already exist.');
    }

    navigate('../sign-in');
  };

  return (
    <div className='container'>
      <h1>Bookwormer Registration</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          name='username'
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <br />
        <button type='submit'>Sign Up</button>
        <p>
          Already have an account? <Link to='../sign-in'>Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
