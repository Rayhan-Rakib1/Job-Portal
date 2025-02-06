import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const SocialLogin = () => { 
const {signInWithGoogle} = useContext(AuthContext);

const handleGoogleSignIn = () => {
    signInWithGoogle()
    .then(res => {
        console.log(res.user);
    })
    .catch (err => {
        console.log(err.message);
    })
}

    return (
        <div>
            <button onClick={handleGoogleSignIn} className='btn'>Google</button>
        </div>
    );
};

export default SocialLogin;