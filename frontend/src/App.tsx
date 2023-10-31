import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ConfigProvider } from 'antd';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Search from './pages/Search';

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
        <Route path='/search' element={<Search />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
