import type { FormInstance } from 'antd';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import { fetchResetPassword } from '../services/index';

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
    <Button type='primary' htmlType='submit' disabled={!submittable}>
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
    <Form
      form={form}
      name='dependencies'
      autoComplete='off'
      style={{ maxWidth: 600, padding: '0 50px' }}
      layout='vertical'
      onFinish={handlerFinish}
    >
      <h1>Set Password</h1>

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
          <Button htmlType='reset'>Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
export default SetPassword;
