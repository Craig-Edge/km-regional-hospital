import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HospitalLogin({ onLogin }) {
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');

  useEffect(() => {
    fetchHospitalOptions();
  }, []);

  const fetchHospitalOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/hospitals/');
      const hospitals = response.data.map(hospital => hospital.hospital_name);
      setHospitalOptions(hospitals);
    } catch (error) {
      console.error('Error fetching hospital options:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(selectedHospital);
  };

  return (
    <div>
      <h1>Regional Hospital Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="hospital-name">Select Hospital:</label>
        <select id="hospital-name" name="hospital-name" value={selectedHospital} onChange={(e) => setSelectedHospital(e.target.value)}>
          <option value="">Select Hospital</option>
          {hospitalOptions.map((hospital, index) => (
            <option key={index} value={hospital}>{hospital}</option>
          ))}
        </select>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default HospitalLogin;
