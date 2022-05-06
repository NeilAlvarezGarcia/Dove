import { useEffect, useReducer } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { database, getFiles, getFolder, getFolders } from "../../firebase/fireStore";

const ACTIONS = {
    SELECT_FOLDER: 'SELECT_FOLDER',
    UPDATE_FOLDER: 'UPDATE_FOLDER',
    SET_CHILD_FOLDERS: 'SET_CHILD_FOLDERS',
    SET_CHILD_FILES: 'SET_CHILD_FILES'
}

function reducer(state, {type, payload}) {
    switch(type) {
        case ACTIONS.SELECT_FOLDER: 
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: []
            };
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder
            };
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders
            };
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles
            };
        default: 
            return state;
    }
}

export function useFolder(folderId = null, folder = null) {
    const {currentUser, ROOT_FOLDER, location: {path}, setRenderScreen} = useAuth();
    

    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    });

    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER,
            payload: {
                folderId,
                folder
            }
        });
        
    }, [folderId, folder]);

    useEffect(() => {
        if(!folderId) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: {folder: ROOT_FOLDER}
            });
        }

        getFolder(folderId, path)
            .then(doc => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: database.formatDoc(doc) },
                });
            })
            .catch(() => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: ROOT_FOLDER },
                });
            })
    }, [folderId, ROOT_FOLDER, path]);

    useEffect(() => {
        getFolders(folderId, currentUser.uid, dispatch, ACTIONS.SET_CHILD_FOLDERS, path)
        return setRenderScreen(prev => ({...prev, folderRender: true}));
    }, [folderId, currentUser, path, setRenderScreen]);


    useEffect(() => {
        getFiles(folderId, currentUser.uid, dispatch, ACTIONS.SET_CHILD_FILES, path);
        return setRenderScreen(prev => ({...prev, fileRender: true}));
    }, [folderId, currentUser, path, setRenderScreen]);
    return state;
}