import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DispatchRequests({ hospitalName }) {
  const [dispatchRequests, setDispatchRequests] = useState([]);

  useEffect(() => {
    fetchDispatchRequests();
  }, []);

  const fetchDispatchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/api/dispatch-requests/?hospital_name=${hospitalName}`);
      setDispatchRequests(response.data);
    } catch (error) {
      console.error('Error fetching dispatch requests:', error);
    }
  };

  return (
    <div>
      <h2>Dispatch Requests for {hospitalName}</h2>
      <ul>
        {dispatchRequests.map((dispatchRequest) => (
          <li key={dispatchRequest.id}>
            NHS Number: {dispatchRequest.nhs_number}<br />
            Location: {dispatchRequest.location}<br />
            Chosen Hospital: {dispatchRequest.chosen_hospital}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DispatchRequests;
