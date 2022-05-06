import {createPortal} from 'react-dom';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {useAuth} from '../../contexts/AuthContext';
import { uploadFile } from '../../firebase/storage';
import {useFolder} from '../hooks/useFolder';
import { ProgressBar, Toast } from 'react-bootstrap';
import {v4 as uuidV4} from 'uuid';

const AddFileButton = ({currentFolder, setShowCard}) => {
    const {ROOT_FOLDER} = useFolder();
    const [uploadingFiles, setUploadingFiles] = useState([]);
    const {currentUser, location: {path}} = useAuth();

    const handleChange = (e) => {
        setShowCard(false);

        const file = e.target.files[0];
        if(!currentFolder || !file) return;
        
        const id = uuidV4()
        setUploadingFiles(prevUploadingFile => [
            ...prevUploadingFile,
            {
                id, 
                name: file.name,
                progress: 0,
                error: false
            }
        ]);

        const parentPath = `${currentFolder.path.join('/')}`;

        const filePath = currentFolder === ROOT_FOLDER ? `${parentPath}/${file.name}` : `${parentPath}/${currentFolder.name}/${file.name}`;

        const refFile = `/files/${currentUser.uid}/${filePath}`;
        const ids = {
            folderId: currentFolder.id,
            userId: currentUser.uid
        }

        uploadFile(refFile, file, ids, {setProgress: setUploadingFiles, id}, path);
    }

    return (
        <>
            <label className='btn btn-outline-success btn-sm m-0'>
                <FontAwesomeIcon icon={faFileUpload} className='me-2'/>
                Upload File
                <input type='file' onChange={handleChange} style={{opacity: 0, position: 'absolute', left: '-9999px'}}/>
            </label>
            {uploadingFiles.length > 0 && 
                createPortal(
                    <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        maxWidth: '250px'
                    }}>
                        {uploadingFiles.map(file => (
                            <Toast key={file.id}
                                onClose={() => {
                                    setUploadingFiles(prevUploadingFile => {
                                        return prevUploadingFile.filter(uploadFile => uploadFile.id !== file.id);
                                    });
                                }}
                            >
                                <Toast.Header 
                                    className='text-truncate w-100 d-block'
                                    closeButton={file.error}
                                >
                                    {file.name}
                                </Toast.Header>
                                <Toast.Body>
                                    <ProgressBar 
                                        aniamted={+!file.error}
                                        variant={file.erro ? 'danger' : 'primary'}
                                        now={file.error ? 100 : file.progress * 100}
                                        label={
                                            file.error ? 'Error' : `${Math.round(file.progress)}`
                                        }
                                    />
                                </Toast.Body>
                            </Toast>
                        ))}
                    </div>
                    ,
                    document.body   
                )   
            }
        </>
    )
};

export default AddFileButton;
