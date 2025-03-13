import * as React from "react";
import { AppProvider, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { childrenRoutes } from "../routes/routes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { theme } from "../styles/theme/createTheme";

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
  const filteredNavigation = React.useMemo(() => {
    return childrenRoutes?.filter((item) => item?.showInSidebar) || [];
  }, []);
  const { window } = props;
  const router = useLayoutRouter();

  const layoutWindow = window ? window() : undefined;

  return (
      <AppProvider
        navigation={filteredNavigation}
        router={router}
        theme={theme}
        window={layoutWindow}
        branding={{ title: "CausaTech", homeUrl: "/" }}
      >
        <DashboardLayout sx={{ width: "100%" }}>
          <div style={{ padding: 20 }}>
            <Outlet />
          </div>
        </DashboardLayout>
      </AppProvider>
  );
}
