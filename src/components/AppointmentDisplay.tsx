import { Grid, Paper, Typography } from "@mui/material";
import { Appointments } from "../models/Appointments";


interface AppointmentDisplayProps {
  appointment: Appointments;
  
};

const AppointmentDisplay: React.FC<AppointmentDisplayProps> = (props) => {
  const { appointment } = props;
  return (
    <Paper  sx={{p: 2}}>
      <Grid 
        container
        direction="column"
      >
        <Grid item>
          <Typography variant="h4">{`${appointment.type} - ${appointment.patient_name}`}</Typography>
        </Grid>
        <Grid item>
          Further data for appointments to be displayed here
        </Grid>
      </Grid>
      <Grid item>

      </Grid>
    </Paper>
  );
};

export default AppointmentDisplay;