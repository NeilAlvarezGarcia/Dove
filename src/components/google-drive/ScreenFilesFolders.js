import React, { useState } from 'react'
import { useFolder } from '../hooks/useFolder';
import ContainerAssets from './ContainerAssets';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import { useAuth } from '../../contexts/AuthContext';
import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

const ScreenFilesFolders = () => {
    const [typeList, setTypeList] = useState('compact');
    const {location: {folderId}, renderScreen: {fileRender, folderRender}} = useAuth();
    const {folder, childFolders, childFiles} = useFolder(folderId);
    
    return (
        <div className='flex-grow-1' style={{height: '100%'}}>
            {
                fileRender && folderRender && (
                    <>
                        <div className='d-flex border-bottom pb-2 px-3'>
                            <FolderBreadcrumbs currentFolder={folder}/>
                            <div>
                                {typeList === 'compact' ? (
                                    <Button variant='light' data-bs-toggle="tooltip" data-bs-placement="bottom" title="CheatSheet" onClick={() => setTypeList('list')}>
                                        <FontAwesomeIcon icon={faList}/>
                                    </Button>
                                ) : (
                                    <Button variant='light' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Compact" onClick={() => setTypeList('compact')}>
                                        <FontAwesomeIcon icon={faTh}/>
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className='overflow-auto' style={{
                            height: '100%',
                            paddingBottom: '10rem'
                        }}>
                            <ContainerAssets content={{childFolders, childFiles}} typeList={typeList}/>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ScreenFilesFolders

