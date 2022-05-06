import React from 'react'
import { Modal } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { useFolder } from '../hooks/useFolder';
import AddFileButton from './AddFileButton';
import AddFolderButton from './AddFolderButton';

const ModalButtonsCreator = ({setShowCard}) => {
    const {location: {folderId}} = useAuth();
    const {folder} = useFolder(folderId);

    const closeCard = e => {
        if(e.target.classList.contains('root')) {
            setShowCard(false);
        }
    }

    return (
        <div className='w-100 root' style={{
            position: 'absolute',
            zIndex: 10,
            top: '0',
            minHeight: '100vh'
        }}
        onClick={closeCard}
        >
            <Modal.Dialog
                style={{
                    minWidth: '300px',
                    position: 'absolute',
                    top: '6rem',
                    left: '2rem',
                    zIndex: 11,
                }}
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Add New
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className=' d-flex flex-column' style={{gap: '.2rem'}}>
                    <AddFileButton currentFolder={folder} setShowCard={setShowCard}/>
                    <AddFolderButton currentFolder={folder} setShowCard={setShowCard}/>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default ModalButtonsCreator