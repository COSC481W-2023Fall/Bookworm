import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage: React.FC = () => {
  return (
    <div className="container">
      <h1>404</h1>
      <p className="page">Page Not Found!</p>
      <p>Sorry, but the page you are looking for doesn't exist.</p>
      <Link to="/" className="goback">Go back home</Link>
    </div>
  );
};

export default ErrorPage;
