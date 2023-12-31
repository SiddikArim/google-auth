import React, { useState } from 'react';
import app from '../../firebase.init';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';

const Login = () => {
    const [user, setUser] = useState(null)

    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log('sign in success', loggedInUser);
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log("signed out", result)
                setUser(null)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleGithubSignIn = () =>{
        signInWithPopup(auth, githubProvider)
        .then ( result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div>
            {/* user ? logout : sign in */}
            {user ?
                <button onClick={handleSignOut}>Sign Out</button> :
                <div>
                    <button onClick={handleGoogleSignIn}>Google login</button>
                    {/* muloto parameter pass korte hole evave function lekhe pore function er por () diye er vitor parameter diye dey */}
                    <button onClick={()=>{handleGithubSignIn()}}>Github login</button>
                </div>
            }
            {user && <div>
                <h3>User: {user.displayName}</h3>
                <p>email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;