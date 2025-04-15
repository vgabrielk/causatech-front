import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../interfaces/User";
import api from "../api/api";
import { useNotifications } from "@toolpad/core/useNotifications";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  formErrors: {
    email?: string;  
    password?: string;
  };
  clearFormErrors: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const notifications = useNotifications();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth === "true";
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("auth", String(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (user: User) => {
    clearFormErrors();
    if (!user) return;
    try {
      const response = await api.post("/login", {
        email: user.email,
        password: user.password,
      });
  
      const token = response.data.token;
      const userData = response.data.user;
      
      localStorage.setItem("token", token);
      localStorage.setItem("auth", "true");

      localStorage.setItem("user", JSON.stringify(userData));
  
      setIsAuthenticated(true);
  
      notifications.show("Logado com sucesso!", {
        severity: "success",
        autoHideDuration: 1500,
      });
    } catch (error) {
      const errors = (error as any)?.response?.data?.error;
  
      if (typeof errors === "string") {
        notifications.show(errors || "Erro ao fazer login. Tente novamente.", {
          severity: "error",
          autoHideDuration: 1500,
        });
      } else {
        setFormErrors(errors);
      }
      return { general: "Erro ao fazer login. Tente novamente." };
    }
  };

  const logout = async () => {
    await api.post('/logout');
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };
  const clearFormErrors = () => {
    setGeneralError('');
    setFormErrors({});
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, formErrors, clearFormErrors }}>
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
