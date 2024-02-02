import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PageRoutes from './PageRoutes';
import AppHeader from './components/AppHeader';
import { useEffect, useState } from 'react';
import { getPageTitle } from './util/PageTitles';
import { loggedInUserIsValid } from './api/UsersApi';
import { logout } from "./util/feature-functions/Login";
import { loadAppointments } from './util/feature-functions/Appointments';

function App() {
  // @ts-ignore
  const loggedInUser = globalThis.__LOGGEDINUSER__;
  const navigate = useNavigate();
  const { hash, pathname } = useLocation();
  let parentPages = ["/home", "/patient-records", "/appointments", "/settings"];
  const [pageTitle, setPageTitle] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);
  const [appHasInited, setAppHasInited] = useState(false);

  const redoLogin = async () => {
    await logout().then(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    if (loggedInUser === undefined && pathname !== "/login") {
      navigate("/login");
    } else if (loggedInUser) {
      loggedInUserIsValid(loggedInUser).then((result) => {
        if (result && (pathname === "" || pathname === "/" || pathname === "/login")) {
          navigate("/home");
        } else if (!result) {
          redoLogin();
        }
      }, (error) => {
        redoLogin();
      })
    }
  }, [loggedInUser, pathname]);

  useEffect(() => {
    setPageTitle(getPageTitle(pathname));
    if (!parentPages.includes(pathname) && !showBackButton) {
      setShowBackButton(true);
    } else if (parentPages.includes(pathname) && showBackButton) {
      setShowBackButton(false);
    }
  }, [pathname]);
  
  const load = async () => {
    await loadAppointments().then((success: boolean) => {
      if (success) {
        setAppHasInited(success);
      }
    });
  };

  useEffect(() => {
    if (!appHasInited) {
      load();
    }
  }, [appHasInited]);

  return (
    <Container maxWidth={false} disableGutters sx={{ display: 'flex', width: "100%" }}>
      <AppHeader showBack={showBackButton} pageTitle={pageTitle} />
      <PageRoutes />
    </Container>
  );
}

export default App;
