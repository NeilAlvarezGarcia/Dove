import React from 'react'
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext';

const FolderAssets = ({folder, type}) => {
    const {location: {path}, openMenuOptions} = useAuth();

    const createdAt = (date) => {
        if(!date.createdAt) return '';

        const dateString = date.createdAt.toDate();
        const [, month, day, year] = `${dateString}`.split(' ')
        return `${day} ${month} ${year}`;
    }

    return (
        <>
            { type === 'compact' ? (
                <div className='col-4 mb-3'>
                    <Button variant='outline-secondary' as={Link} to={`/${path}/${folder.id}`} className='text-truncate w-100 px-4' onContextMenu={openMenuOptions}>
                        <FontAwesomeIcon icon={faFolder} className='me-2'/>
                        {folder.name}
                    </Button>
                </div>

            ) : (
                <tr style={{cursor: 'default'}} className='tabla' onContextMenu={openMenuOptions}>
                    <td>
                        <Button variant='' as={Link} to={`/${path}/${folder.id}`} className='bg-transparent text-start text-truncate w-100 text-secondary'>
                            <FontAwesomeIcon icon={faFolder} className='me-2'/>
                            {folder.name}
                        </Button>
                    </td>
                    <td className='text-secondary'>me</td>
                    <td className='text-secondary'>{createdAt(folder)}</td>
                    <td className='text-secondary'>--</td>
                </tr>
            )}
        </>
    )
}

export default FolderAssets