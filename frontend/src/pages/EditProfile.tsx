import { Button, Form, Input, Select } from 'antd';
import './EditProfile.css';
import useAuth from './UserAuth';
import { fetchProfileSave } from '../services';
import { ProfileData } from './Profile';

function EditProfile() {
  const { username } = useAuth();

  const onSubmit = async (val: ProfileData) => {
    try {
      const response = await fetchProfileSave(JSON.stringify({
        ...val,
        username
      }));

      if (response.status === 201) {
        return alert('Edit profile sucessfully');
      }
      console.error('Failed to save profile data');
    } catch (error) {
      console.error('Error while saving profile data:', error);
    }
  };

  return (
    <div className='edit-profile-form'>
      <h1>Edit Profile</h1>
      <Form
        name='basic'
        autoComplete='off'
        style={{ maxWidth: 600, padding: '0 50px' }}
        layout='vertical'
        onFinish={onSubmit}
      >
        <Form.Item label='Gender' name='gender'>
          <Select placeholder='Gender'>
            <Select.Option value='male'>Male</Select.Option>
            <Select.Option value='female'>Female</Select.Option>
            <Select.Option value='other'>Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label='Occupation' name='occupation'>
          <Input placeholder='Occupation' />
        </Form.Item>

        <Form.Item label='Favorite Book' name='favoriteBook'>
          <Input placeholder='Favorite Book' />
        </Form.Item>

        <Form.Item label='About Me' name='description'>
          <Input placeholder='About Me' />
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
