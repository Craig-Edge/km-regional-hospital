import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  const [selectedHospital, setSelectedHospital] = useState('');

  return (
    <div className="App">
      <h1>KwikMedical System</h1>
      <Dashboard selectedHospital={selectedHospital} setSelectedHospital={setSelectedHospital} />
    </div>
  );
}

export default App;
