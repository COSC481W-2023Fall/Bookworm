// Import necessary libraries
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import './signup-styles.css';
import { submitRegistrationData } from '../services';
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

  // NOTE: https://ant.design/components/form#components-form-demo-register
  return (
    <div className='container'>
      <h1>BookWorm Registration</h1>

      <Form name='basic' autoComplete='off' onFinish={handleSubmit}>
        <Form.Item
          name='email'
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your email!' }
          ]}
        >
          <Input placeholder='email' prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          name='username'
          rules={[
            { required: true, message: 'Please input your username!' }
          ]}
        >
          <Input placeholder='username' prefix={<UserOutlined />}/>
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder='password' prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
          name='confirm-password'
          rules={[
            { required: true, message: 'Please input your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('Password does not match');
              }
            })
          ]}
        >
          <Input.Password placeholder='confirm password' prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            style={{
              width: '300px',
              height: '40px',
              borderRadius: '20px',
              backgroundColor: 'var(--secondary-button-background)'
            }}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUp;
