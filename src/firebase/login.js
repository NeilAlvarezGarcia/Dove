import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./initialize";


export async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(err) {
        let message = '';
        if( err.code === 'auth/user-not-found') message = 'Email not found. type correctly the email';
        else if( err.code === 'auth/wrong-password') message = 'Password wrong. Click on "Forgot password" to change it';
        else if( err.code === 'auth/network-request-failed') message = 'Not internet connection to login';
        else message = 'Failed to login';
        
        return {error: message};
    }
}