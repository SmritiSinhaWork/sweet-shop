import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/sweet';

interface AuthContextType {
  user: User | null;
  // This now correctly expects 'username'
  login: (username: string, password: string) => Promise<void>; 
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is your Django API's address
const API_URL = 'http://127.0.0.1:8000/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This part is good - it checks if you're already logged in
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // --- NEW, REAL LOGIN FUNCTION ---
  const login = async (username: string, password: string) => {
    
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // This now correctly sends username
        username: username, 
        password: password,
      }),
    });

    // --- THIS IS THE SECURITY FIX ---
    if (!response.ok) {
      // If the server returns a 401, 400, etc.
      // throw an error to stop the login.
      throw new Error('Login failed. Please check your credentials.');
    }

    // If login is successful, get the tokens
    const data = await response.json();
    const token = data.access; // Get the access token from Simple JWT

    // --- This is still a mock user, but it only runs AFTER a real login ---
    const loggedInUser: User = {
      id: 'mock-id', // We can't get this from the token (yet)
      email: `${username}@example.com`, // This is still a mock
      isAdmin: username === 'admin', // Mock isAdmin check
      token: token,
    };

    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  // --- NEW, REAL REGISTER FUNCTION ---
  const register = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        }),
    });

    if (!response.ok) {
        // Handle errors from the server (e.g., username taken)
        throw new Error('Registration failed.');
    }

    // Registration successful, but it does NOT log the user in.
    // The user must go to the login page.
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};