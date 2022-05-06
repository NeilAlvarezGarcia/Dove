import React from 'react'
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = ({fs}) => {
    const {currentUser} = useAuth();
    const {photoURL, displayName, email} = currentUser;
    const letter = displayName ? displayName.substring(0, 1).toUpperCase() : email.substring(0, 1).toUpperCase();

    return (
        <>
            {photoURL ? (
                <img src={photoURL} alt='profile' className='img-fluid' style={{
                    objectFit: 'cover',
                }}/>
            ) : ( 
                <span className={`text-white fs-${fs}`}>{letter}</span>
            )}
        </>
    )
}

export default UserProfile;