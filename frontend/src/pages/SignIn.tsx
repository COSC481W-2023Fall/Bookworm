import './SignIn.module.css'
import SigninForm from './SignInForm'

function SignIn(): JSX.Element {
  return (
    <div className = "signin-container">
        <div className = "signin-wrap">
            <div className = "signin-form">
                <h1>BookWorm</h1>
                <h1>Sign in</h1>
                <SigninForm />
            </div>           
        </div>
    </div>
  )
}

export default SignIn
