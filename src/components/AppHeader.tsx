import { useEffect, useState } from "react";
import Menu from "./Menu";
import { AppBar, Box, IconButton, Toolbar, Typography, styled } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation } from "react-router-dom";
import history from "history/browser";

interface AppHeaderProps {
  showBack: boolean;
  pageTitle: string;
}

const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const { showBack, pageTitle } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState("none");
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/login" && display !== "none") {
      setDisplay("none");
    } else if (pathname !== "/login" && display === "none") {
      setDisplay("block");
    }
  }, [pathname]);

  const onBackClick = () => {
    history.back();
  };

  return (
    <>
      {/** Main Header */}
        <AppBar 
          position="fixed"
          sx={{
            display: display,
            flexGrow: 1,
            width: { md: `calc(100% - 240px)` },
            ml: { md: `240px` },
          }}
        >
          <Toolbar variant="dense">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { md: 'none' }  }}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <MenuIcon />
            </IconButton>
            {!!showBack && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="back-button"
                sx={{ mr: 2 }}
                onClick={onBackClick}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {pageTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      {/**side drawer w/ Menu */}
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} display={display}/>
    </>
  )
};

export default AppHeader;