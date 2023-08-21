import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard({ selectedHospital, setSelectedHospital }) {
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [dispatchRequests, setDispatchRequests] = useState([]);

  useEffect(() => {
    fetchHospitalOptions();
    fetchDispatchRequests();
  }, [selectedHospital]);

  const fetchHospitalOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/hospitals/');
      const hospitals = response.data.map(hospital => hospital.hospital_name);
      setHospitalOptions(hospitals);
    } catch (error) {
      console.error('Error fetching hospital options:', error);
    }
  };

  const fetchDispatchRequests = async () => {
    if (selectedHospital) {
      try {
        const response = await axios.get(`http://localhost:8001/api/dispatch-requests/?hospital_name=${selectedHospital}`);
        setDispatchRequests(response.data);
      } catch (error) {
        console.error('Error fetching dispatch requests:', error);
      }
    }
  };

  const handleRefresh = () => {
    fetchDispatchRequests();
  };

  const handleAccept = async (id) => {
    try {
      await axios.patch(`http://localhost:8001/api/dispatch-requests/${id}/`, { dispatch_status: 'accepted' });
      fetchDispatchRequests();
    } catch (error) {
      console.error('Error accepting dispatch request:', error);
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.patch(`http://localhost:8001/api/dispatch-requests/${id}/`, { dispatch_status: 'denied' });
      fetchDispatchRequests();
    } catch (error) {
      console.error('Error denying dispatch request:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2 className="hospital-name">{selectedHospital}</h2>
      <div className="dashboard-buttons">
        <button className="refresh-button" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
      <div className="hospital-selection">
        <select
          id="hospital-name"
          name="hospital-name"
          value={selectedHospital}
          onChange={(e) => setSelectedHospital(e.target.value)}
        >
          <option value="">Select Hospital</option>
          {hospitalOptions.map((hospital, index) => (
            <option key={index} value={hospital}>
              {hospital}
            </option>
          ))}
        </select>
      </div>
      {selectedHospital && (
        <div className="dispatch-requests">
          {dispatchRequests.map((dispatchRequest) => (
            <div key={dispatchRequest.id} className="dispatch-request">
              <div className="dispatch-info">
                <p><strong>Request ID:</strong> {dispatchRequest.id}</p>
                <p><strong>NHS Number:</strong> {dispatchRequest.nhs_number}</p>
                <p><strong>Location:</strong> {dispatchRequest.location}</p>
                <p><strong>Severity:</strong> {dispatchRequest.severity}</p>
                <p><strong>Medical Condition:</strong> {dispatchRequest.medical_condition}</p>
                <p><strong>Dispatch Status:</strong> {dispatchRequest.dispatch_status}</p>
              </div>
              <div className="dispatch-actions">
                { (
                  <>
                    <button onClick={() => handleAccept(dispatchRequest.id)}>Accept</button>
                    <button className="deny" onClick={() => handleDeny(dispatchRequest.id)}>Deny</button>
                  </>
                )}
                {dispatchRequest.dispatch_status && (
                  <p><strong>Status:</strong> {dispatchRequest.dispatch_status}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
