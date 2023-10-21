import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {JSXChildrenProps} from '../@types';
import axios from 'axios';


export interface AuthContextType {
  token: string | null,
  setToken: React.Dispatch<React.SetStateAction<string | null>>
}

const AuthContext = createContext<AuthContextType>({
  token: '',
  setToken: (value) => {
    value;
  }
});

const AuthWrapper = (props: JSXChildrenProps) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const contextValue = useMemo(() => ({
    token,
    setToken,
  }), [token]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthWrapper;
