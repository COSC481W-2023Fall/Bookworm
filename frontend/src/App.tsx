import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ConfigProvider } from 'antd';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Shelf from './pages/Shelf';
import Search from './pages/Search';
import BookView from './pages/BookView';
import Reviews from './pages/Reviews';

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
        <Route path='/shelf' element={<Shelf />} />
        <Route path='/search' element={<Search />} />
        <Route path='/book/:isbn' element={<BookView />} />
        <Route path='/book/:isbn/reviews' element={<Reviews />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
