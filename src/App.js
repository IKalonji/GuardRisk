import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppStateService } from './state-singletons/app-state.service';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Policies from './pages/PoliciesPage';
import Dashboard from './pages/Management';
import StakingPage from './pages/StakingPage';
import StakerOptions from './pages/StakerOptions';
import ModaIltemsList from './components/ModaIltemsList';

import ErrorBoundary from './ErrorBoundary';
import './App.css'

const App = () => {

  const stateService = new AppStateService();

  return (
    <Router>
      <ErrorBoundary>

      <Navbar singleton={stateService}/>
      <Routes>
        <Route path="/" element={<Home singleton={stateService}/>}  />
        <Route path="/policies" element={<Policies singleton={stateService}/>} />
        <Route path="/Management" element={<Dashboard singleton={stateService}/>} />
        <Route path='/become-a-staker' element={<StakingPage />}/>
        <Route path='/stake-options' element={<StakerOptions />}/>
        <Route path='/list' element={<ModaIltemsList />} />
      </Routes>

      </ErrorBoundary>
    </Router>
  );
};

export default App;
