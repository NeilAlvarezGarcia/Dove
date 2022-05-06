import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext';

const ButtonPanel = ({text ,icon, navigate}) => {
    const {location: {path}} = useAuth();
    const current = path.includes(navigate);

    return (
        <Nav.Item>
            <Nav.Link as={Link} to={navigate} className={`ps-3 ${current ? 'bg-primary text-white' : 'bg-light'}`} style={{
                borderRadius: '0 2rem 2rem 0',
                maxWidth: '100%'
            }}>
                <FontAwesomeIcon icon={icon} className='me-2'/>
                {text}
            </Nav.Link>
        </Nav.Item>
    )
}

export default ButtonPanel