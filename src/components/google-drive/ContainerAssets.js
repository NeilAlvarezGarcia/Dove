import { faEyeSlash, faFolderOpen, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Table } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FileAssets from './FileAssets';
import FolderAssets from './FolderAssets';
import NofileFolder from './NofileFolder';

const ContainerAssets = ({content: {childFolders, childFiles}, typeList}) => {
    const {location: {folderId}} = useAuth();

    return (
        <>
            {childFolders.length > 0 || childFiles.length > 0 ? (
                <>
                    {typeList === 'compact' ? (
                        <div className='py-2 container'>
                            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4'>
                                {childFolders.map(folder => (
                                    <FolderAssets key={folder.id} folder={folder} type='compact'/>
                                ))}
                            </div>
                            {childFolders.length > 0 && <hr className='mt-0'/>}
                            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4'>
                                {childFiles.map(file => (
                                    <FileAssets key={file.id} file={file} type='compact'/>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='pe-4 py-2'>
                            <Table variant='white' className='table-borderless' hover>
                                <thead>
                                    <tr>
                                        <th className='text-secondary'>Name</th>
                                        <th className='text-secondary'>Owner</th>
                                        <th className='text-secondary'>Created At</th>
                                        <th className='text-secondary'>Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {childFolders.map(folder => (
                                        <FolderAssets key={folder.id} folder={folder} type='list'/>
                                    ))}
                                    {childFiles.map(file => (
                                        <FileAssets key={file.id} file={file} type='list'/>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </>
            ) : (
                <Routes>
                    <Route path={`${folderId ? '/favorites/:id' : '/favorites'}`} element={<NofileFolder icon={faStar} text1='There´s no favorites files' text2='Add to favorites the files you would like to find easely.'/>}/>
                    <Route path={`${folderId ? '/principal/:id' : '/principal'}`} element={<NofileFolder icon={faFolderOpen} text1='No files is created' text2='use "Add new".'/>}/>
                    <Route path={`${folderId ? '/deleted/:id' : '/deleted'}`} element={<NofileFolder icon={faTrash} text1='There´s nothing in the trash' text2='Remove the elements that do not need to the trash. They will be remove after 30 days definily.'/>}/>
                    <Route path={`${folderId ? '/hide/:id' : '/hide'}`} element={<NofileFolder icon={faEyeSlash} text1='Nothing is hidden.' text2='Hidden files will be shown here.'/>}/>
                </Routes>
            )}
        
        </>
    );
};

export default ContainerAssets;
