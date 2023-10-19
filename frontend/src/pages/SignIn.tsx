import './SigninC.css'
import SigninForm from './SignInForm'
import { Typography } from 'antd';

function SignIn(): JSX.Element {
  return (
    <div className = "signin-container">
        <div className = "signin-wrap">
            <div className = "signin-form">
              <Typography.Title level={1} className='title'>
                BookWorm
              </Typography.Title>
              <Typography.Title level={2} className='title'>
                Sign in
              </Typography.Title>
              <SigninForm />
            </div>           
        </div>
    </div>
  )
}

export default SignIn
