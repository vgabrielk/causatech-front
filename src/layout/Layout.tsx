import * as React from "react";
import { AppProvider, NavigationItem, Router, type Session } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { childrenRoutes } from "../routes/routes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { theme } from "../styles/theme/createTheme";
import { useAuth } from "../context/AuthContext";

function useLayoutRouter(): Router {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    pathname: location.pathname,
    searchParams: new URLSearchParams(location.search),
    navigate: (path: string | URL) => navigate(path),
  };
}

export default function DashboardLayoutBasic(props: any) {
  const user =  JSON.parse(localStorage.getItem("user") || '{}');  

  const filteredNavigation = React.useMemo(() => {
    return childrenRoutes?.filter((item) => item?.showInSidebar) || [];
  }, []);

  const demoSession = {
    user: {
      name: user?.email,
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  };

  const { window } = props;
  const router = useLayoutRouter();
  const auth = useAuth();

  const layoutWindow = window ? window() : undefined;
  const [session, setSession] = React.useState<Session | null>(demoSession);


  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        auth.logout();
      },
    };
  }, []);


  return (
      <AppProvider
        navigation={filteredNavigation as NavigationItem[]}
        router={router}
        theme={theme}
        window={layoutWindow}
        session={demoSession}
        authentication={authentication}
        branding={{ homeUrl: "/", title: "Causa tech", logo:  "" }}
      >
        <DashboardLayout sx={{ width: "100%" }}>
          <div style={{ padding: 20 }}>
            <Outlet />
          </div>
        </DashboardLayout>
      </AppProvider>
  );
}
