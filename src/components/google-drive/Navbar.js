import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { Button, Form, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Profile from './Profile';
import UserProfile from './UserProfile';

export default function NavbarComponent() {
  const {location: {path}} = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <Navbar expand='sm' className='px-4 py-1 d-flex justify-content-between border-seconday border-bottom'>
        <Navbar.Brand as={Link} to='/principal'>
          <h1 className='text-center text fs-3'>
                <span className='text-primary'>D</span>
                <span className='text-danger'>o</span>
                <span className='text-warning'>v</span>
                <span className='text-success'>e</span>
          </h1>
        </Navbar.Brand>
        {path !== 'update-profile' && (
          <Form className="d-flex w-50 bg-light rounded p-1">
            <Button variant='light' className='rounded-circle'>
              <FontAwesomeIcon icon={faSearch} className='text-secondary'/>
            </Button>
            <Form.Control
              type="search"
              placeholder="Search in Dove"
              className="me-2 border-0 bg-transparent btn-outline-light"
              aria-label="Search"
            />
          </Form>
        )}
        <Nav className='bg-primary rounded-circle w-50 d-flex justify-content-center align-items-center' style={{
          maxWidth: '40px',
          maxHeight: '40px',
          overflow: 'hidden'
        }}>
          <Nav.Link onClick={() => setShowProfile(true)} style={{
            minWidth: '60px',
            minHeight: '60px',
          }} className='d-flex justify-content-center align-items-center'>
              {<UserProfile fs='5'/>}
          </Nav.Link>

          {showProfile && <Profile setShowProfile={setShowProfile} showProfile={showProfile}/>}
        </Nav>
    </Navbar>
  );
}
