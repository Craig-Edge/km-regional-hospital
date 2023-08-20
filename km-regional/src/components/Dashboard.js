import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      // Update the UI to reflect the change
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
      // Update the UI to reflect the change
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
    <div>
      <h2>Dispatch Requests</h2>
      <div>
      <button onClick={fetchDispatchRequests}>Refresh</button>
      </div>
      <ul>
        {dispatchRequests.map(request => (
          <li key={request.id}>
            {request.id} - {request.nhs_number} - {request.location} - {request.severity} - {request.medical_condition} - Dispatch Status: {request.dispatch_status}
            {!request.accepted && (
              <div>
                <button onClick={() => handleAccept(request.id)}>Accept</button>
                <button onClick={() => handleDeny(request.id)}>Deny</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
