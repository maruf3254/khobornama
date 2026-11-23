// import { createContext, useContext, useState, useEffect } from 'react';
// import { authAPI } from '../services/api';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const savedUser = localStorage.getItem('user');

//     if (token && savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     const response = await authAPI.login({ email, password });
//     const { token, ...userData } = response.data.data;

//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);

//     return userData;
//   };

//   const register = async (name, email, password , role) => {
//     const response = await authAPI.register({ name, email, password , role });
//     const { token, ...userData } = response.data.data;

//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);

//     return userData;
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   const updateUser = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//   };

//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     updateUser,
//     isAuthenticated: !!user,
//     isAdmin: user?.role === 'admin'
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore authentication from localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      const savedUser = localStorage.getItem('user')

      if (token && savedUser) {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Failed to restore authentication:', error)

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Login
  const login = async (email, password) => {
    const response = await authAPI.login({ email, password })

    const { token, ...userData } = response.data.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))

    setUser(userData)

    return userData
  }

  // Register
  const register = async (name, email, password, role) => {
    const response = await authAPI.register({
      name,
      email,
      password,
      role
    })

    const { token, ...userData } = response.data.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))

    setUser(userData)

    return userData
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setUser(null)
  }

  // Update User
  const updateUser = userData => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,

    isAuthenticated: !!user && !!localStorage.getItem('token'),

    isAdmin: user?.role === 'admin'
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
