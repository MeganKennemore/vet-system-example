import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PageRoutes from './PageRoutes';
import AppHeader from './components/AppHeader';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { noBackButton, selectAppHasInited, selectBackButton, selectLoggedInUser, yesBackButton } from './features/app/AppSlice';
import { useEffect, useState } from 'react';
import { getPageTitle } from './util/PageTitles';
import { loadAppointments } from './features/appointments/AppointmentActions';
import { loggedInUserIsValid } from './api/UsersApi';
import { logout } from './features/app/AppActions';

function App() {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { hash, pathname } = useLocation();
  const showBackButton = useAppSelector(selectBackButton);
  const appHasInited = useAppSelector(selectAppHasInited);
  let parentPages = ["/home", "/patient-records", "/appointments", "/settings"];
  const [pageTitle, setPageTitle] = useState("");

  const redoLogin = async () => {
    await dispatch(await logout()).then(() => {
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
      dispatch(yesBackButton());
    } else if (parentPages.includes(pathname) && showBackButton) {
      dispatch(noBackButton());
    }
  }, [pathname]);
  
  const load = async () => {
    await dispatch(await loadAppointments());
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
