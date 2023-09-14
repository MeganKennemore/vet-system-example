import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PageRoutes from '../../PageRoutes';
import AppHeader from '../../components/AppHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { noBackButton, selectBackButton, selectLoggedInUser, yesBackButton } from './AppSlice';
import { useEffect } from 'react';

function App() {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const showBackButton = useAppSelector(selectBackButton);
  let parentPages = ["/home", "/patient-records", "/appointments", "/settings"]

  useEffect(() => {
    if (loggedInUser === undefined && pathname !== "/login") {
      navigate("/login");
    }
  }, [loggedInUser, pathname]);

  useEffect(() => {
    if (!parentPages.includes(pathname) && !showBackButton) {
      dispatch(yesBackButton());
    } else if (parentPages.includes(pathname) && showBackButton) {
      dispatch(noBackButton());
    }
  }, [pathname]);

  return (
    <Container maxWidth={false} disableGutters sx={{ display: 'flex', width: "100%" }}>
      <AppHeader showBack={showBackButton}/>
      <PageRoutes />
    </Container>
  );
}

export default App;
