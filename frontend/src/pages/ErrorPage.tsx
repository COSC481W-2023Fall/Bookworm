import { Link } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage() {
  return (
    <div className='container404'>
      <h1>404</h1>
      <p className='page'>Page Not Found!</p>
      <p>Sorry, but the page you are looking for does not exist.</p>
      <Link to='/' className='goback'>
        Go Back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
