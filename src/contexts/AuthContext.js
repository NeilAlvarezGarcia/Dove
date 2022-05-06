import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase/initialize';

const AuthContext = createContext();
const initialStateMenuOption = {
    active: false,
    position: {
        x: 0,
        y: 0
    },
    target: null
}

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const {pathname} = useLocation();
    const [path, folderId, route] = custommizeDataLocation(pathname); 
    const ROOT_FOLDER =  useMemo(() => ({
        name: path, 
        id: null, 
        path: []
    }), [path]);
    const location = useMemo(() => ({path: route, folderId}), [route, folderId]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [renderScreen, setRenderScreen] = useState({
        fileRender: false,
        folderRender: false
    });
    const [showMenuOptions, setShowMenuOptions] = useState(initialStateMenuOption);
    const openMenuOptions = (e) => {
        e.preventDefault();
        const width = window.innerWidth;
        const height = window.innerHeight;
        let x, y;
        
        if(e.clientX < (width / 4)) {
            x = e.clientX + 50;
        } else if(e.clientX > (width - width / 4)) {
            x = e.clientX - 200;
        } else if(e.clientX < (width - width / 4) && e.clientX > (width / 4)){
            x = e.clientX;
        }
        
        if(e.clientY > (height - height / 3)) {
            y = e.clientY - 200;
        } else {
            y = e.clientY;
        }

        setShowMenuOptions({
            active: true,
            position: {
                x,
                y
            },
            target: e.currentTarget
        })
        if(e.currentTarget.classList.contains('tabla')) e.currentTarget.style.backgroundColor = '#e8f0fe';
    }
    const closeMenuOptions = e => {
        if(showMenuOptions.target.classList.contains('tabla')) showMenuOptions.target.style.backgroundColor = '#fff';
        setShowMenuOptions(initialStateMenuOption)
    }

    const value = {
        currentUser,
        location,
        ROOT_FOLDER,
        renderScreen,
        setRenderScreen,
        showMenuOptions,
        openMenuOptions,
        closeMenuOptions
    }
    
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if(user) {
                setCurrentUser(user);
            }
            setLoading(false);
        });
    }, [setCurrentUser]);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

const custommizeDataLocation = (pathname) => {
    const [, path, folderId] = pathname.split('/');
    const firstLetter = path.substring(0, 1);
    const capitalizePath = path ? path.replace(path.substring(0, 1), firstLetter.toLocaleUpperCase()) : 'Principal';

    return [capitalizePath , folderId, path ? path : 'principal'];
}