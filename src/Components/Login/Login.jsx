import React, { useState } from 'react';
import app from '../../firebase.init';
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';

const Login = () => {
    const [ user, setUser] = useState(null)
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const handleGoogleSignIn = () => {
       signInWithPopup(auth , provider)
       .then(result => {
        const loggedInUser = result.user;
        console.log('sign in success', loggedInUser);
        setUser(loggedInUser);
       })
       .catch(error =>{
        console.log(error)
       })
    }

    const handleSignOut = () =>{
        signOut(auth)
        .then( result => {
            console.log("signed out", result)
            setUser(null)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div>
            {/* user ? logout : sign in */}
           {user ? <button onClick={handleSignOut}>Sign Out</button> :
            <button onClick={handleGoogleSignIn}>Google login</button>}
           {user && <div>
                <h3>User: {user.displayName}</h3>
                <p>email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;