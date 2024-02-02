import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../util/feature-functions/Login";

interface MenuProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  display: string;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { isOpen, setIsOpen, display } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  // @ts-ignore
  const loggedInUser = globalThis.__LOGGEDINUSER__;
  const isLargerDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const toggleDrawer = (toggle: boolean) => () => {
    setIsOpen(toggle);
  };

  const logoutClick = () => {
    logout().then(() => {
      navigate("/");
    }).catch(() => {
      // ¯\_(ツ)_/¯
    })
  };

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      url: "/home",
    },
    {
      text: "Patients",
      icon: <PetsIcon />,
      url: "/patient-records",
    },
    {
      text: "Appointments",
      icon: <CalendarMonthIcon />,
      url: "/appointments",
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      url: "/settings",
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      action: logoutClick
     },
  ];

  return (
    <Box
      component="nav"
      aria-label="menu-drawer"
      sx={{ width: { xs: "100%", md: 240 }, flexShrink: { xs: 1000, md: 0 } }}
      style={{ display: display }}
    >
      <SwipeableDrawer
        anchor="left"
        variant={isLargerDevice? "permanent" : "temporary"}
        open={isLargerDevice ? true: isOpen}
        onOpen={toggleDrawer(true)}
        onClose={toggleDrawer(false)}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: {xs: "100%", md: 240 } },
        }}
      >
        <div style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography style={{ padding: theme.spacing(2), fontWeight: 500 }}>
            {loggedInUser?.user?.first_name} {loggedInUser?.user?.last_name}
          </Typography>
          <IconButton 
            onClick={toggleDrawer(false)}
            sx={{ mr: 2, display: { md: 'none' }  }}
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        </div>
        <List disablePadding>
          {menuItems.map((item, index) => {
            if (item.url) {
              return (
                <Link 
                  key={`menu-item-${item.text}-${index}`} 
                  to={item.url} 
                  style={{ color: "inherit", textDecoration: "none" }}
                  onClick={toggleDrawer(false)}
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text}/>
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            }
            return (
              <ListItem key={`menu-item-logout-${index}`} disablePadding>
                <ListItemButton onClick={item.action}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text}/>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </SwipeableDrawer>
    </Box>
  );
};

export default Menu;