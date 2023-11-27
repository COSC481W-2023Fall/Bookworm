import { Button, Form, Input, Select } from 'antd';
import './EditProfile.css';
import useAuth from './UserAuth';
import { EditProfileData, fetchProfileSave } from '../services';

function EditProfile() {
  const { username } = useAuth();

  const onSubmit = async (val: EditProfileData) => {
    const { gender, occupation, favoriteBook, description, username } = val;

    try {
      const response = await fetchProfileSave(
        JSON.stringify({
          gender,
          occupation,
          favoriteBook,
          description,
          username
        })
      );

      if (response.status === 201) {
        return alert('Edit profile sucessfully');
      } else {
        console.error('Failed to save profile data');
      }
    } catch (error) {
      console.error('Error while saving profile data:', error);
    }
  };

  return (
    <div className='edit-profile-form'>
      <h1>User Info Edit</h1>
      <Form name='basic' autoComplete='off' onFinish={onSubmit}>
        <Form.Item name='gender'>
          <Select placeholder='Gender'>
            <Select.Option value='male'>Male</Select.Option>
            <Select.Option value='female'>Female</Select.Option>
            <Select.Option value='other'>Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name='occupation'>
          <Input placeholder='Occupation' />
        </Form.Item>

        <Form.Item name='favoriteBook'>
          <Input placeholder='Favorite Book' />
        </Form.Item>

        <Form.Item name='description'>
          <Input placeholder='About Me' />
        </Form.Item>

        <Form.Item
          name='username'
          rules={[
            { required: true, message: 'Please input your username!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('username') === username) {
                  return Promise.resolve();
                }

                return Promise.reject('Username does not match');
              }
            })
          ]}
        >
          <Input placeholder='Username Confirmation' />
        </Form.Item>

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
          Save & Show
        </Button>
      </Form>
    </div>
  );
}

export default EditProfile;
