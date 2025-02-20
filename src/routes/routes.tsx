import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/home";
import LoginPage from "../pages/auth/login";
import CriarUsuario from "../pages/usuarios/create";
import Usuarios from "../pages/usuarios";
import Contratos from "../pages/contratos";
import CriarContrato from "../pages/contratos/create";
import NotFound from "../pages/not-found";
import { DocumentScannerRounded, HomeRounded, LocalPolice, Person } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";  
import React from "react";

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
]);

export default router;
