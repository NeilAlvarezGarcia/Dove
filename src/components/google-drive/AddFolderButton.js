import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import {database} from '../../firebase/fireStore';
import { useAuth } from '../../contexts/AuthContext';

const AddFolderButton = ({currentFolder, setShowCard}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const {currentUser, ROOT_FOLDER} = useAuth();

    const openModal = () => setOpen(true);
    const closeModal = () => {
        setShowCard(false)
        setOpen(false)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const path = [...currentFolder.path];
        if(currentFolder !== ROOT_FOLDER) {
            path.push({
                name: currentFolder.name, id: currentFolder.id
            })
        }

        if(name.length > 25) return setError(true);

        try {
            database.folders({
                name,
                parentId: currentFolder.id,
                userId: currentUser.uid,
                path,
            }, 'principal')
        } catch(err) {
            console.log(err)
        }

        setName('');
        closeModal();
    }

  return (
    <>
        <Button onClick={openModal} variant='outline-success' size='sm'>
            <FontAwesomeIcon icon={faFolderPlus} className='me-2'/> Create Folder
        </Button>
        <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Folder Name</Form.Label>
                        <Form.Control
                            type='text'
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        {error && <p className='text-danger'>Name too long to asign. maxlength of 25 characters</p>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='primary' type='submit'>Add Folder</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
  );
};

export default AddFolderButton;
