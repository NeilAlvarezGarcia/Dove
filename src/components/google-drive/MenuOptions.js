import { faEyeSlash, faPen, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const MenuOptions = () => {
    const {closeMenuOptions, showMenuOptions: {position: {x, y}}} = useAuth();

    const closeCard = e => {
        e.preventDefault();

        closeMenuOptions();
    }

    const addToDirectory = (e) => {
        
    }

    return (
        <div className='w-100 root' style={{
            position: 'absolute',
            zIndex: 10,
            top: 0,
            minHeight: '100vh'
        }}
        onClick={closeCard}
        onContextMenu={closeCard}
        >
            <Modal.Dialog
                style={{
                    minWidth: '200px',
                    position: 'absolute',
                    top: `${y}px`,
                    left: `${x}px`,
                    zIndex: 11,
                }}
            >
                <Modal.Body className='d-flex flex-column p-0'>
                    <Button variant='light' className='border-bottom text-start ps-4 text-muted' onClick={addToDirectory}>
                        <FontAwesomeIcon icon={faStar} className='me-2 text-grey'/>
                        Add to favorites
                    </Button>
                    <Button variant='light' className='border-bottom text-start ps-4 text-muted'>
                        <FontAwesomeIcon icon={faEyeSlash} className='me-2 text-grey'/>
                        Hide
                    </Button>
                    <Button variant='light' className='border-bottom text-start ps-4 text-muted'>
                        <FontAwesomeIcon icon={faPen} className='me-2 text-grey'/>
                        Change Name
                    </Button>
                    <Button variant='light' className='border-bottom text-start ps-4 text-muted'>
                        <FontAwesomeIcon icon={faTrash} className='me-2 text-grey'/>
                        Delete
                    </Button>
                </Modal.Body>
            </Modal.Dialog>
        </div> 
    )
}

export default MenuOptions