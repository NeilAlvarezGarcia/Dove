import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./initialize";

export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return {error: ''}
    } catch(err) {
        let message = '';
        if( err.code === 'auth/user-not-found') message = 'Email not found. type correctly the email to change the password';
        else if( err.code === 'auth/network-request-failed') message = 'Not internet connection to continue';
        else message = 'Something went wrong';
        
        return {error: message};
    }
}