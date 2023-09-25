import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PageRoutes from './PageRoutes';
import AppHeader from './components/AppHeader';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { noBackButton, selectBackButton, selectLoggedInUser, yesBackButton } from './features/app/AppSlice';
import { useEffect, useState } from 'react';
import { getPageTitle } from './util/PageTitles';

function App() {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { hash, pathname } = useLocation();
  const showBackButton = useAppSelector(selectBackButton);
  let parentPages = ["/home", "/patient-records", "/appointments", "/settings"];
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    if (loggedInUser === undefined && pathname !== "/login") {
      navigate("/login");
    } else if (loggedInUser && (pathname === "" || pathname === "/")) {
      navigate("/home");
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

  return (
    <Container maxWidth={false} disableGutters sx={{ display: 'flex', width: "100%" }}>
      <AppHeader showBack={showBackButton} pageTitle={pageTitle} />
      <PageRoutes />
    </Container>
  );
}

export default App;
