import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "./initialize";
import {uploadImageProfile} from './storage';

export const profileUpdate = {
    email: async (email) => {
        try {
            await updateEmail(auth.currentUser, email);
        } catch(err) {
            console.log(err)
        }
    },
    password: async (password) => {
        try {
            if(password) {
                await updatePassword(auth.currentUser, password);
            }
        } catch(err) {
            console.log(err)
        }
    },
    profile: async (profile) => {
        try {
            if(profile.photoURL) {
                const path = `/files/${auth.currentUser.uid}/image-profile`;
                await uploadImageProfile(path, profile);
            } else {
                await updateProfile(auth.currentUser, profile);
            }
        } catch(err) {
            console.log(err);
        }
    }
}
