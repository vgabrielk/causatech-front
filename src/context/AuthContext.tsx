import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../interfaces/User";
import api from "../api/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth === "true";
  });

  useEffect(() => {
    localStorage.setItem("auth", String(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (user: User) => {
    if(!user){
      return;
    }
    try {
      const response = await api.post("/login", {
        email: user.email,
        password: user.password,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        if (response.status == 200) {
          return (window.location.href = "/");
        }
      }, 1000);
      setIsAuthenticated(true);
      localStorage.setItem("auth", "true");

      return;
    } catch (error) {
      return error;
    }
  };

  const logout = async () => {
    await api.post('/logout');
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
    window.location.href=""
  };

  // const auth = useAuth();
  // const logout = () => api.post('/logout');
  // useEffect( () => {
  //    logout()
  //    auth.logout();
  //    window.location.href=""
  // },[])
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
