
'use client'

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [emailOtp, setEmailOtp] = useState('');

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser , emailOtp , setEmailOtp }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);