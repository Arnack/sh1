'use client'

import { createContext, FC, useContext, useEffect, useState } from "react";
import LS from "../service/LS";

interface User {
  email?: string;
  password?: string;
  access_token: string;
  refresh_token: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  let lsUser = LS.getUserInfo();
  const [user, setUser] = useState<User | null>(lsUser.user);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
