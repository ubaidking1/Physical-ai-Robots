import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

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
  const [authClient, setAuthClient] = useState<any>(null);

  // ✅ Load betterauth ONLY in browser
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    import('./betterauth').then((mod) => {
      setAuthClient(mod.auth);
    });
  }, []);

  const signUp = async (data: { email: string; password: string }) => {
    if (!authClient) throw new Error('Auth not ready');
    const result = await authClient.signUp(data);
    setCurrentUser(result.user);
    return result.user;
  };

  const signIn = async (data: { email: string; password: string }) => {
    if (!authClient) throw new Error('Auth not ready');
    const user = await authClient.signIn(data);
    setCurrentUser(user);
    return user;
  };

  const signOut = () => {
    setCurrentUser(null);
    authClient?.signOut?.();
  };

  const value: AuthContextType = {
    currentUser,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
