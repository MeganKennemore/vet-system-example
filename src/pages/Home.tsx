import { Box, Grid, Dialog, Paper, Theme, useMediaQuery, DialogContent, DialogActions, Button, Toolbar, AppBar } from "@mui/material";
import { selectLoggedInUser } from "../features/app/AppSlice";
import { useAppSelector } from "../store/hooks";
import ScheduleDisplay from "../components/ScheduleDisplay";
import { Appointments } from "../models/Appointments";
import { useState } from "react";
import AppointmentDisplay from "../components/AppointmentDisplay";

const Home: React.FC = () => {
  const isLargerDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const loggedInUser = useAppSelector(selectLoggedInUser);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointments>();
  
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
        <Grid item xs={12} lg={3}>
          <Paper sx={{p: 2}}>
            <ScheduleDisplay 
              userId={loggedInUser?.user?.user_id || "t-001"}
              onApptClick={(e) => {
                if (e === selectedAppointment) {
                  setSelectedAppointment(undefined);
                } else {
                  setSelectedAppointment(e as Appointments);
                }
              }}
              selectedAppt={selectedAppointment}
            />
          </Paper>
        </Grid>
        {(isLargerDevice && selectedAppointment) && (
          <Grid item lg={9}>
            <Paper sx={{ p: 2 }}>
              <AppointmentDisplay appointment={selectedAppointment} />
            </Paper>
            {/* <Paper sx={{p: 2}}>
              <Typography variant={"h6"}>Appointment details</Typography>
              <p>Appropriate details for the appointment. Have panel hidden or collapsed until an appointment is selected?</p>
              <p>Patient name, appointment time, reason for appointment, appointment type, owner name/contact info</p>
              <p>Somewhere on the panel should be something that can take you to a full page version of the appointment, where the user can then make changes, record events of the appointment, etc</p>
              <p>Panel of buttons at the bottom for Cancel, Reschedule, etc?</p>
            </Paper> */}
          </Grid>
        )}
      </Grid>
      {(!isLargerDevice && selectedAppointment) && (
        <Dialog 
          fullScreen 
          open={!!selectedAppointment}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <DialogActions>
                <Button autoFocus color="inherit" onClick={() => {
                  setSelectedAppointment(undefined);
                }}>
                  Close
                </Button>
              </DialogActions>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <AppointmentDisplay appointment={selectedAppointment} />
          </DialogContent>
        </Dialog>
      )}
      <p>Somewhere on this page neeeds to be buttons for quick actions (ie no menu navigation) for creating a new appointment</p>
      <p>On mobile, can be a FAB button (MUI doesn't have FAB groups/lists like Ionic. Might be able to duplicate with Popover API, or find other solution?)</p>
    </Box>
  )
};

export default Home;