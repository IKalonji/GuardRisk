import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { AppStateService } from '../state-singletons/app-state.service';

const Dashboard = (props) => {
  
  return (
    <div className="dashboard">
      <Sidebar/>
    </div>
  );
};

export default Dashboard;
