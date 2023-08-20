// HospitalContext.js
import React, { createContext, useContext, useState } from 'react';

const HospitalContext = createContext();

export const HospitalProvider = ({ children }) => {
  const [selectedHospital, setSelectedHospital] = useState('');

  return (
    <HospitalContext.Provider value={{ selectedHospital, setSelectedHospital }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospitalContext = () => useContext(HospitalContext);
