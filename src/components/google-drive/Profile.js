import React from 'react';
import {createPortal} from 'react-dom';
import { signOut } from 'firebase/auth';
import { Button, Modal, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import {auth} from '../../firebase/initialize';

function Profile({setShowProfile}) {
  const {currentUser} = auth;
  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      window.location.reload();
    });
  }

  const closeCard = e => {
    if(e.target.classList.contains('root')) {
      setShowProfile(false);
    }
  }

  return (
    createPortal(
      <div className='w-100 root' style={{
        position: 'absolute',
        zIndex: 10,
        top: '0',
        minHeight: '100vh'
      }}
      onClick={closeCard}>
        <Modal.Dialog border="light" 
        style={{
          position: 'absolute',
          top: '2rem',
          right: '1rem',
          boxShadow: '0 0 5px rgba(0, 0, 0, .5)',
          minWidth: '20rem',
          zIndex: 11
        }} className='rounded'>
          <Modal.Header	className='bg-light d-flex justify-content-center'>
            <div className='rounded-circle bg-primary' style={{
                maxWidth: '70px',
                maxHeight: '70px',
                overflow: 'hidden'
            }}>
                <div className='bg-primary d-flex justify-content-center align-items-center' style={{
                  cursor: 'default',
                  minWidth: '70px',
                  minHeight: '70px',
                }}>
                  {<UserProfile fs='3'/>}
                </div>
            </div>
          </Modal.Header>

          <Modal.Body className='text-center'>
                {currentUser.displayName && <Modal.Title>{currentUser.displayName}</Modal.Title>}
                <p>{currentUser.email}</p>
                <Nav.Link as={Link} to='update-profile' onClick={() => setShowProfile(false)} className='btn btn-primary w-100 mt-3 text-white'>Update Profile</Nav.Link>
            </Modal.Body>

            <Modal.Footer className="w-100 text-center py-3">
                <Button className='w-100 p-0 border border-secondary bg-light text-black' onClick={handleLogout}>Log Out</Button>
            </Modal.Footer>
        </Modal.Dialog>
      </div>,
      document.body 
    )
  );
}

export default Profile;
