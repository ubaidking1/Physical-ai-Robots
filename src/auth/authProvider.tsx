import React, { createContext, useContext, ReactNode, useState } from 'react';
import { auth } from './betterauth';

type User = {
  id: string;
  email?: string;
};

type AuthContextType = {
  currentUser: User | null;
  signUp: (data: { email: string; password: string }) => Promise<User>;
  signIn: (data: { email: string; password: string }) => Promise<User>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signUp = async (data: { email: string; password: string }) => {
    const result = await auth.signUp(data);
    setCurrentUser(result.user);
    return result.user;
  };

  const signIn = async (data: { email: string; password: string }) => {
    const user = await auth.signIn(data);
    setCurrentUser(user);
    return user;
  };

  const signOut = () => {
    setCurrentUser(null);
    // Add auth.signOut() if your library supports it
  };

  const value: AuthContextType = {
    currentUser,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to access auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
