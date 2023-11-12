import { ConfigProvider } from 'antd';
import { Route, Routes } from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
import { ConfigProvider } from 'antd';
=======
import Browse from './pages/Browse';
>>>>>>> b30435d (fix: Modify user profile and public profile display)
import Home from './pages/Home';
import ProfileLayout from './pages/ProfileLayout';
// import ShowProfileLay from './pages/ShowProfile';
import BookView from './pages/BookView';
import Search from './pages/Search';
import ShowProfileLayout from './pages/ShowProfileLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
<<<<<<< HEAD
import Shelf from './pages/Shelf';
import Search from './pages/Search';
import BookView from './pages/BookView';
import Reviews from './pages/Reviews';
=======
>>>>>>> b30435d (fix: Modify user profile and public profile display)

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
        <Route path='/book/:isbn/reviews' element={<Reviews />} />
        <Route path='/search' element={<Search />} />
        <Route path='/book/:isbn' element={<BookView />} />
        <Route path='/profile/:username' element={<ShowProfileLayout />} />
        <Route path='/profile' element={<ProfileLayout />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
