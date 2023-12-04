import { Link } from 'react-router-dom';
import './ErrorPage.css';
import { Button } from 'antd';

function ErrorPage() {
  return (
    <div className='container404'>
      <h1>404</h1>
      <p id='page'>Page Not Found!</p>
      <p>Sorry, but the page you are looking for does not exist.</p>
      <Link to='/'>
        <Button
          type='primary'
          style={{
            width: '300px',
            height: '40px',
            borderRadius: '20px',
            backgroundColor: 'var(--secondary-button-background)'
          }}
        >
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}

export default ErrorPage;
