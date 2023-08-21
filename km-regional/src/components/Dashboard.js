import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard({ selectedHospital }) {
  const [dispatchRequests, setDispatchRequests] = useState([]);

  useEffect(() => {
    fetchDispatchRequests();
  }, []);

  const fetchDispatchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/api/dispatch-requests/?hospital_name=${selectedHospital}`);
      setDispatchRequests(response.data);
    } catch (error) {
      console.error('Error fetching dispatch requests:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.patch(`http://localhost:8001/api/dispatch-requests/${id}/`, { dispatch_status: 'accepted' });
      const updatedRequests = dispatchRequests.map(request => {
        if (request.id === id) {
          return { ...request, dispatch_status: 'accepted' };
        }
        return request;
      });
      setDispatchRequests(updatedRequests);
    } catch (error) {
      console.error('Error accepting dispatch request:', error);
    }
  };

  const handleDeny = async (id) => {
    try {
      await axios.patch(`http://localhost:8001/api/dispatch-requests/${id}/`, { dispatch_status: 'denied' });
      const updatedRequests = dispatchRequests.map(request => {
        if (request.id === id) {
          return { ...request, dispatch_status: 'denied' };
        }
        return request;
      });
      setDispatchRequests(updatedRequests);
    } catch (error) {
      console.error('Error denying dispatch request:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dispatch Requests</h2>
      <div className="dashboard-buttons">
        <button onClick={fetchDispatchRequests}>Refresh</button>
      </div>
      <div className="dispatch-requests">
        {dispatchRequests.map(request => (
          <div key={request.id} className="dispatch-request">
            <div className="dispatch-info">
              <span><strong>Request ID:</strong> {request.id}</span> 
              <span><strong>NHS Number:</strong> {request.nhs_number}</span> 
              <span><strong>Location:</strong> {request.location}</span>
              <span><strong>Severity:</strong> {request.severity}</span> 
              <span><strong>Medical Condition:</strong> {request.medical_condition}</span> 
              <span><strong>Dispatch Status:</strong> {request.dispatch_status}</span>
            </div>
            <div className="dispatch-actions">
              {!request.accepted && (
                <>
                  <button onClick={() => handleAccept(request.id)}>Accept</button>
                  <button className="deny" onClick={() => handleDeny(request.id)}>Deny</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
