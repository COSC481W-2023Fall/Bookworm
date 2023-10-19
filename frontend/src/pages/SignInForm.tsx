import { Button, Form, Input } from 'antd';
import { MailOutlined , LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SigninForm() {

  axios.defaults.withCredentials = true

  const navigate = useNavigate()

  // handle the submission of a sign-in form. It communicates with a server endpoint  to perform
  //  user authentication.
    const handlerFinish = (val:{email: string, password: string}) => {
        // console.log(val)
        axios.post('http://localhost:3000/sign-in', val)
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

        <Form.Item name="email" rules={[{ type: 'email', message: 'The input is not valid E-mail!',},{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder = "email" prefix = {<MailOutlined />}/>
        </Form.Item>
    
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} style={{ borderRadius: '20px' }}>
          <Input.Password placeholder = "password" prefix = {<LockOutlined />} />
        </Form.Item>  

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{width: '300px',height: '40px', borderRadius: '20px', backgroundColor: 'var(--secondary-button-background)' }}>
            Sign in
          </Button>
        </Form.Item>
      </Form>
    )
}

export default SigninForm