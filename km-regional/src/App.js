// App.js

import React, { useState } from 'react';
import './App.css';
import HospitalLogin from './components/HospitalLogin';
import Dashboard from './components/Dashboard';

function App() {
  const [selectedHospital, setSelectedHospital] = useState('');

  const handleLogin = (hospital) => {
    setSelectedHospital(hospital);
  };

  return (
    <div className="App">
      <h1>KwikMedical System</h1>
      {selectedHospital ? <Dashboard selectedHospital={selectedHospital} /> : <HospitalLogin onLogin={handleLogin} />}
    </div>
  );
}

export default App;
