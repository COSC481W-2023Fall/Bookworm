import type { FormInstance } from 'antd';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import { fetchResetPassword } from '../services/index';
import './EditProfile.css';

function SubmitButton({ form }: { form: FormInstance }) {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button
      type='primary'
      htmlType='submit'
      disabled={!submittable}
      style={{
        width: '150px',
        height: '40px',
        borderRadius: '20px',
        backgroundColor: 'var(--secondary-button-background)'
      }}
    >
      Submit
    </Button>
  );
}

// const res = await fetchProfile(val:SetPasswordData);

function SetPassword() {
  const [form] = Form.useForm();

  const handlerFinish = async (val: {
    password: string;
    password2: string;
  }) => {
    const { password } = val;
    const result = await fetchResetPassword(password);
    alert(result.data);
  };

  return (
    <div className='edit-profile-form'>
      <Form
        form={form}
        name='dependencies'
        autoComplete='off'
        style={{ maxWidth: 600, padding: '0 50px' }}
        layout='vertical'
        onFinish={handlerFinish}
      >
        <h1>Reset Password</h1>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true }]}
          wrapperCol={{ span: 32 }}
        >
          <Input.Password />
        </Form.Item>

        {/* Field */}
        <Form.Item
          label='Confirm Password'
          name='password2'
          dependencies={['password']}
          rules={[
            {
              required: true
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered does not match!')
                );
              }
            })
          ]}
          wrapperCol={{ span: 32 }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Space>
            <SubmitButton form={form} />
            <Button
              htmlType='reset'
              style={{
                width: '150px',
                height: '40px',
                borderRadius: '20px',
                color: 'white',
                backgroundColor: 'var(--secondary-button-background)'
              }}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
export default SetPassword;
