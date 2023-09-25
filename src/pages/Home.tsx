import { Box, Grid, List, ListItem, ListSubheader, Paper, Theme, Typography, useMediaQuery } from "@mui/material";

const Home: React.FC = () => {
  const isLargerDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  return (
    <Box 
      component="main" 
      sx={{ 
        position: "absolute", 
        right: 0, 
        flexGrow: 1, 
        p: {
          xs: 1,
          md: 3,
        },
        paddingTop: {
          xs: 8,
          md: 8
        }, 
        width: { 
          xs: "100%", 
          md: `calc(100% - 240px)` 
        } 
      }}
    >
      <Grid
        container
        flexDirection={isLargerDevice ? "row" : "column"} 
        alignItems={"stretch"}
        spacing={2}
      >
        <Grid item lg={3}>
          <Paper sx={{p: 2}}>
            <List>
              <ListSubheader>Today's Appointments</ListSubheader>
              <ListItem>Appt 1</ListItem>
              <ListItem>Appt 2</ListItem>
              <ListItem>Appt 3</ListItem>
              <ListItem>Appt 4</ListItem>
              <ListItem>Appt 5</ListItem>
            </List>
            <p>This should be formatted as a time table, with appointments placed at the correct time.</p>
            <p>Clicking an appointment will open its details in the panel to the right. On Mobile, should open up fullscreen modal with the same effect</p>
            <p>This should be specfic to logged in user</p>
            <p>Viewing all appointments for the entire practice should be done on appointments page</p>
          </Paper>
        </Grid>
        <Grid item lg={9}>
          <Paper sx={{p: 2}}>
            <Typography variant={"h6"}>Appointment details</Typography>
            <p>Appropriate details for the appointment. Have panel hidden or collapsed until an appointment is selected?</p>
            <p>Patient name, appointment time, reason for appointment, appointment type, owner name/contact info</p>
            <p>Somewhere on the panel should be something that can take you to a full page version of the appointment, where the user can then make changes, record events of the appointment, etc</p>
            <p>Panel of buttons at the bottom for Cancel, Reschedule, etc?</p>
          </Paper>
        </Grid>
      </Grid>
      <p>Somewhere on this page neeeds to be buttons for quick actions (ie no menu navigation) for creating a new appointment</p>
      <p>On mobile, can be a FAB button (MUI doesn't have FAB groups/lists like Ionic. Might be able to duplicate with Popover API, or find other solution?)</p>
    </Box>
  )
};

export default Home;