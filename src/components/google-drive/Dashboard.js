import {Routes, Route} from 'react-router-dom';
import MainDashboard from './MainDashboard';
import UpdateProfile from './UpdateProfile';
import Navbar from './Navbar';
import { useAuth } from '../../contexts/AuthContext';
import MenuOptions from './MenuOptions';

function Dashboard() {
  const {showMenuOptions} = useAuth();
  
  return (
    <div className='w-100' style={{height: '100%'}}>
      <Navbar/>
      <Routes>
        <Route path='/*' element={<MainDashboard/>}/>
        <Route path='update-profile' element={<UpdateProfile/>}/>
      </Routes>
      {showMenuOptions.active && <MenuOptions/>}
    </div>
  );
}

export default Dashboard;
