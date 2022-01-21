import React, { useState, useContext } from 'react'; 

const AppContext = React.createContext(); 

const AppProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
    {children}
  </AppContext.Provider>
  );
}; 

export const useAppContext = () => {
  return useContext(AppContext);
}; 

export { AppContext, AppProvider };