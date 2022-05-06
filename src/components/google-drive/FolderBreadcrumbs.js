import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import {Button, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const FolderBreadcrumbs = ({currentFolder}) => {
    const {location: {path : route}, ROOT_FOLDER} = useAuth();

    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if(currentFolder) path = [...path, ...currentFolder.path];
    
    
    return (
        <Container className='flex-grow-1'>
            {path.map((folder, i) => (
                <Fragment key={i}>
                    <Button 
                        variant='light'
                        className='text-truncate'
                        as={Link} 
                        to={folder.id ? `/${route}/${folder.id}` : `/${route}`}
                        style={{maxWidth: '150px'}}
                        >
                        {folder.name}
                    </Button>
                    <FontAwesomeIcon icon={faAngleRight} className='mx-2'/>
                </Fragment>
            ))}
            {
                currentFolder && (
                    <Button className='text-truncate' variant='primary' style={{maxWidth: '100px'}}
                    disabled>
                        {currentFolder.name}
                    </Button>
                )
            }
        </Container>
    );
};

export default FolderBreadcrumbs;
