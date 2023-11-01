import { ConfigProvider } from 'antd';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Browse from './pages/Browse';
import Home from './pages/Home';
import ProfileLayout from './pages/ProfileLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App(): JSX.Element {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '"Inter", sans-serif'
        }
      }}
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/browse' element={<Browse />} />
        <Route path='/profile' element={<ProfileLayout />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
