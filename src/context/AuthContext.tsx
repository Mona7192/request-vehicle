// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  userToken: string | null;
  setUserToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  setUserToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
