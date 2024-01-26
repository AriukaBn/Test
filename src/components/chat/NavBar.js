import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase-config';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
    const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);
  const navigate = useNavigate();
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      })
      .catch((error) => console.log(error));
  };
  
  const {currentUser} = useContext(AuthContext);

    return (
        <div className='navbar'>
             {authUser ? (
                <>
                    <span className='logo'>Chat</span>
                    <div className='user'>
                        <img src={currentUser.photoURL} alt=''/>
                        <span>{currentUser.displayName}</span>
                        <button onClick={userSignOut}>Sign Out</button>
                    </div>
                </>
                ) : (
                <p>Signed Out</p>
            )}
        </div>
    )
}
export default NavBar;