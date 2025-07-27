import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';


function App() {

  //Authorization initial state
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  //creating function for Logout 
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    })
  }

  return (
    <Router>
      <nav>
        <button className='nav-button'><Link to="/"> Home </Link></button>

        {!isAuth ? (<button className='nav-button'><Link to="/login"> Login </Link></button>) : (
          <>
            <button className='nav-button'><Link to="/post"> Create Post </Link></button>

            <button className='nav-button' onClick={signUserOut}>LogOut</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/post' element={<CreatePost isAuth={isAuth} />} />
        <Route path='/edit' element={<EditPost isAuth={isAuth}/>} />
      </Routes>
    </Router>

  );
}

export default App;
