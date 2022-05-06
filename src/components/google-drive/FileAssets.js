import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/AuthContext';

const FileAssets = ({file, type}) => {
    const {openMenuOptions} = useAuth();

    const createdAt = (date) => {
        if(!date.createdAt) return '';

        const dateString = date.createdAt.toDate();
        const [, month, day, year] = `${dateString}`.split(' ')
        return `${day} ${month} ${year}`;
    }

    return (
        <>
            {type === 'compact' ? (
                <div className='col-4 mb-3'>
                    <a href={file.url} target='_blank' className='btn btn-outline-success text-truncate w-100' rel="noreferrer noopener" onContextMenu={openMenuOptions}>
                        <FontAwesomeIcon icon={faFile} className='me-2'/>
                        {file.name}
                    </a>
                </div>
            ) : (
                <tr style={{cursor: 'default'}} className='tabla' onContextMenu={openMenuOptions}>
                    <td>
                        <a href={file.url} target='_blank' className='btn bg-transarent text-start text-truncate w-100 text-success' rel="noreferrer noopener">
                            <FontAwesomeIcon icon={faFile} className='me-2'/>
                            {file.name}
                        </a>
                    </td>
                    <td className='text-secondary'>me</td>
                    <td className='text-secondary'>{createdAt(file)}</td>
                    <td className='text-secondary'>--</td>
                </tr>
            )}
        </>
    );
};

export default FileAssets;
