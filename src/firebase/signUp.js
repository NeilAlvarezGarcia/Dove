import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "./initialize";

export async function signUp(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch(err) {
        let message = '';
        if( err.code === 'auth/email-already-in-use') message = 'Email already in use';
        else if( err.code === 'auth/network-request-failed') message = 'Not internet connection to create the account';
        else message = 'Failed to create an account';
        
        return message;
    }
}
