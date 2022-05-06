import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app, { auth } from "./initialize";
import {database} from './fireStore';
import { updateProfile } from "firebase/auth";

// Call of the storage function
export const storage = getStorage(app);

export async function uploadFile(reference, file, {folderId, userId}, {setProgress, id}, type) {
    try {
        const metadata = {
            contentType: file.type,
        };  
        const storageRef = ref(storage, reference);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setProgress(prevUploadingFile => {
                return prevUploadingFile.map(uploadFile => {
                    if(uploadFile.id === id) {
                        return {...uploadFile, progress}
                    }
                    return uploadFile
                });
            });
        },
        (error) => {
            setProgress(prevUploadingFile => {
                return prevUploadingFile.map(uploadFile => {
                    if(uploadFile.id === id) {
                        return {...uploadFile, error: true}
                    }
                    return uploadFile
                });
            });
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                database.files({
                    url: downloadURL,
                    name: file.name,
                    folderId,
                    userId,
                    type: file.type
                }, type);
                // getSameFiles(folderId, userId, file.name)
                // .then(doc => {
                //    console.log(doc)

                // })
                
               
            }); 

            setTimeout(() => {
                setProgress(prevUploadingFile => {
                    return prevUploadingFile.filter(uploadFile => uploadFile.id !== id);
                });
            }, 1000);
        }
        );

    } catch(err) {
        console.log(err);
    }
}

export async function uploadImageProfile(reference, profile) {
    try {
        const metadata = {
            contentType: profile.photoURL.type,
        };  

        const storageRef = ref(storage, reference);

        const uploadTask = await uploadBytesResumable(storageRef, profile.photoURL, metadata);

        uploadTask.on('state_changed',
        (snapshot) => {},
        (error) => {},
        () => {
            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                profile.photoURL = downloadURL
                updateProfile(auth.currentUser, profile);            
            }); 
        }
        );
    } catch(err) {

    }
}