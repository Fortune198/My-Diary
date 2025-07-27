import React from 'react';
import { auth, facebookProvider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

//function to handle login with Facebook
function Login({ setIsAuth }) {

    //useNavigate hook to redirect user after login
    const navigate = useNavigate();

    const signInWithFacebook = () => {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                // we then set isAuth to true
                setIsAuth(true);
                // we also store the isAuth state in localStorage so we don't have to login again
                localStorage.setItem('isAuth', true);
                // and finally we redirect the user to the home page
                navigate('/');
            })
    };

    return (
        <div className='loginPage'>
            <p>Sign In with Facebook to Continue</p>
            <button className='login-with-fb-btn' onClick={signInWithFacebook}>Login with Facebook</button>
        </div>
    );
}

export default Login;