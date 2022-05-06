import React from 'react';
import ScreenFilesFolders from './ScreenFilesFolders';
import SlideDashboard from './SlideDashboard';

const MainDashboard = () => {
    return (
        <div className='d-flex py-3' style={{height: '100%'}}>
            <SlideDashboard/>
            <ScreenFilesFolders/>
        </div>
    );
}

export default MainDashboard;