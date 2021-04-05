import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  async function getLoggedIn() {
    try {
      const loggedInRes = localStorage.getItem('authToken');
      if (loggedInRes) {
          setLoggedIn(loggedInRes);
          console.log(loggedInRes);
      }
    
    }
    catch (ex) {
      console.log(ex);
    }
  }
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}


export { AuthContextProvider };
