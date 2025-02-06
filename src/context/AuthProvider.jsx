import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import auth from '../firebase/firebase_confiq';
import axios from 'axios';



const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if (currentUser?.email) {
                const user = { email: currentUser.email };
                axios.post('https://job-portal-server-wheat.vercel.app/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log('login token', res.data)
                        setLoading(false);
                    })
            }

            else {
                axios.post('https://job-portal-server-wheat.vercel.app/signOut', {}, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('LogOut', res.data)
                        setLoading(false);
                    })
            }


            console.log('state captured', currentUser?.email);
        });
        return () => {
            unsubscribe()
        };
    }, [])

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const authInfo = {
        user, loading, createUser, signInUser, signOutUser, signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;