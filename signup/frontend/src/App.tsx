import {BrowserRouter as Router,
  Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import Browse from './pages/Browse.tsx';
import { ConfigProvider } from 'antd';

const App: React.FC = () => {

  return (
    <ConfigProvider>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/sign-in' element={<SignIn />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
      </Routes>

    </ConfigProvider>
  );
}

export default App;
