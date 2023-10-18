import { Button, Form, Input } from 'antd';
import { MailOutlined , LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SigninForm() {
  axios.defaults.withCredentials = true
  const navigate = useNavigate()
    const handlerFinish = (val:{email: string, password: string}) => {
        console.log(val)
        axios.post('http://localhost:3000/signin', val)
        .then(res => {
          if(res.data.success){
            navigate('/')
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => console.log(err))
    }

    const handlerFinishFailed = (val: any) => {
        console.log(val)
    }

    return (
        <Form name="basic"  autoComplete="off" onFinish={handlerFinish} onFinishFailed={handlerFinishFailed}>

        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder = "email" prefix = {<MailOutlined />}/>
        </Form.Item>
    
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder = "password" prefix = {<LockOutlined />}/>
        </Form.Item>  

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    )
}

export default SigninForm