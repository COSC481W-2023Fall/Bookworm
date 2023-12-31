import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SignData, fetchSignIn } from '../services/index';

function SigninForm() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const handlerFinish = async (val: SignData) => {
    try {
      const res = await fetchSignIn(val);
      console.log(res);
      if (res.data.success) {
        navigate('/');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form name='basic' autoComplete='off' onFinish={handlerFinish}>
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
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder='password' prefix={<LockOutlined />} />
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
  );
}

export default SigninForm;
