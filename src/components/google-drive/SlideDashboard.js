import React, { useState } from 'react'
// import { useLocation, useParams } from 'react-router-dom';
// import { useFolder } from '../hooks/useFolder';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { faEyeSlash, faPlus, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonPanel from './ButtonPanel';
import ModalButtonsCreator from './ModalButtonsCreator';

const SlideDashboard = () => {
    const [showCard, setShowCard] = useState(false);
    // const res = useLocation();
    // // const [folder, folderId] = res['*'].split('/');
    // // const fId = useFolder(folderId);
    // console.log(res)
    return (
        <>
            <div className="d-flex flex-column align-items-start pb-3 border-seconday border-bottom" style={{
                flexBasis: '20rem',
                minWidth: '20rem'
            }}>
                <div className="ps-3">
                    <Button variant='light' className='rounded-pill mb-3 btn-light' style={{
                        boxShadow: '0 2px 2px 2px rgba(0, 0, 0, .3)',
                        minWidth: '70px',
                        padding: '.8rem 1rem'
                    }}
                    onClick={() => setShowCard(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} className='me-2 text-success'/>
                        Add New
                    </Button>
                </div>
                
                <Navbar className='w-100'>
                    <Nav className='flex-column w-100 me-3'>
                        <ButtonPanel icon={faPlus} navigate='principal' text='Principal'/>
                        <ButtonPanel icon={faEyeSlash} navigate='Hide' text='Hide'/>
                        <ButtonPanel icon={faStar} navigate='favorites' text='Favorites'/>
                        <ButtonPanel icon={faTrash} navigate='deleted' text='Deleted'/>
                    </Nav>
                </Navbar>
            </div>
            {showCard && <ModalButtonsCreator setShowCard={setShowCard}/>}
        </>
    )
}

export default SlideDashboard