import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home";
import LoginPage from "../pages/auth/login";
import CriarUsuario from "../pages/usuarios/create";
import Usuarios from "../pages/usuarios";
import Contratos from "../pages/contratos";
import CriarContrato from "../pages/contratos/create";
import NotFound from "../pages/not-found";
import { DocumentScannerRounded, EmojiPeople, Gavel, HomeRounded, LogoutRounded, Person } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";  
import React from "react";
import Logout from "../pages/logout";
import RegisterPage from "../pages/auth/register";
import Clientes from "../pages/clientes";
import CriarCliente from "../pages/clientes/create";

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

export const childrenRoutes = [
  { 
    segment: "", 
    kind: "home", 
    path: "/", 
    element: <ProtectedRoute element={<Home />} />, 
    title: "Homepage", 
    showInSidebar: true, 
    icon: <HomeRounded fontSize="large" color="primary" />
  },
  { 
    segment: "usuarios", 
    kind: "users", 
    path: "/usuarios", 
    element: <ProtectedRoute element={<Usuarios />} />, 
    title: "Usuários", 
    showInSidebar: true, 
    icon: <Person fontSize="large" color="primary" />  
  },
  { path: "/usuarios/add", element: <ProtectedRoute element={<CriarUsuario />} />, title: "Criar usuário" },
  { path: "/usuarios/edit/:id", element: <ProtectedRoute element={<CriarUsuario />} />, title: "Editar usuário" },
  { 
    segment: "contratos", 
    kind: "contracts", 
    path: "/contratos", 
    element: <ProtectedRoute element={<Contratos />} />, 
    title: "Contratos", 
    showInSidebar: true, 
    icon: <DocumentScannerRounded fontSize="large" color="primary" />
  },
  { 
    segment: "clientes", 
    kind: "clientes", 
    path: "/clientes", 
    element: <ProtectedRoute element={<Clientes/>} />, 
    title: "Clientes", 
    showInSidebar: true, 
    icon: <EmojiPeople fontSize="large" color="primary" />
  },
  { path: "/clientes/add", element: <ProtectedRoute element={<CriarCliente />} />, title: "Criar Cliente" },
  { path: "/clientes/edit/:id", element: <ProtectedRoute element={<CriarCliente />} />, title: "Editar Cliente" },
  { 
    segment: "logout", 
    kind: "logout", 
    path: "/logout", 
    element: <ProtectedRoute element={<Logout />} />, 
    title: "Sair", 
    showInSidebar: true, 
    icon: <LogoutRounded fontSize="large" color="primary" />
  },
  { path: "/contratos/add", element: <ProtectedRoute element={<CriarContrato />} />, title: "Criar Contrato" },
  { path: "/contratos/edit/:id", element: <ProtectedRoute element={<CriarContrato />} />, title: "Editar Contrato" },

  // { Processos
  //   segment: "processos", 
  //   kind: "process", 
  //   path: "/processos", 
  //   element: <ProtectedRoute element={<Contratos />} />, 
  //   title: "Processos", 
  //   showInSidebar: true, 
  //   icon: <LocalPolice fontSize="large" color="primary" />
  // },
  // { path: "/contratos/add", element: <ProtectedRoute element={<CriarContrato />} />, title: "Criar Contrato" },
  // { path: "/contratos/edit/:id", element: <ProtectedRoute element={<CriarContrato />} />, title: "Editar Contrato" },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Layout />
    ),
    children: childrenRoutes,
  },
  { path: "/*", element: <NotFound /> },
  { path: "/login", element: <PublicRoute element={<LoginPage />} /> },  
  { path: "/register", element: <PublicRoute element={<RegisterPage />} /> },  
]);

export default router;
