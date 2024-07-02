import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../firebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);
    const userData = response.user;
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const signup = async (email, password) => {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const userData = response.user;
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    await firebase.auth().signOut();
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
