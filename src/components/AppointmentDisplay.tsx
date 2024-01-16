import { Box, Button, FormControl, Grid, OutlinedInput, Paper, TextField, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Appointments, ApptPatient } from "../models/Appointments";
import { Link, useNavigate } from "react-router-dom";
import { makeProperNoun } from "../util/VisualHelper";
import { Owner } from "../models/Owner";
import { User } from "../models/User";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';

interface AppointmentDisplayProps {
  appointment: Appointments;
  onClose: () => void;
};

const AppointmentDisplay: React.FC<AppointmentDisplayProps> = (props) => {
  const { appointment, onClose } = props;
  const isLargerDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  let theme = useTheme();
  const navigate = useNavigate();

  let start = new Date(appointment.startDate);
  let end = new Date(appointment.endDate);
  
  return (
    <Grid 
      container
      direction="column"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h4">{appointment.type} <span style={{ color: theme.palette.info.dark}}>{start.toLocaleString("en-US", {timeStyle: "short" })} - {end.toLocaleString("en-US", {timeStyle: "short" })} ({start.toLocaleString("en-US", {dateStyle: "long"})})</span></Typography>
        {/* <Typography variant="h5" color={}></Typography> */}
      </Grid>
      <Grid item>
        <Typography><b>Status: </b>{appointment.status}</Typography>
        <Typography><b>Patients: </b></Typography>
        {appointment.patients.map((patient: ApptPatient) => {
          return (
            <Typography><Link to={`/patient-records/patient/${patient.patient_id}`}>{patient.patient_name}</Link>, {patient.patient_gender} {makeProperNoun(patient.patient_species)}</Typography>
          );
        })}
        <Typography><b>Owners: </b></Typography>
        {appointment.owners.map((owner: Owner) => {
          return [
            <Typography>{owner.first_name} {owner.last_name}</Typography>,
            <Typography>Email: {owner.email}</Typography>,
            <Typography gutterBottom>Phone: {owner.phone_one}</Typography>,
          ];
        })}
        <Typography><b>Assigned Staff: </b></Typography>
        {appointment.employees.map((employee: User) => {
          return [
            <Typography>{employee.title} {employee.first_name} {employee.last_name}</Typography>,
            <Typography><i>Phone:</i> {employee.phone_number}</Typography>,
            <Typography><i>Email:</i> {employee.email}</Typography>
          ]
        })}
        <Typography><b>Notes: </b></Typography>
        <FormControl fullWidth>
          <OutlinedInput multiline readOnly value={appointment.pre_appt_notes} />
        </FormControl>
      </Grid>
      {isLargerDevice && (
        <Grid 
          item
          container
          alignItems={"center"}
          justifyContent={"flex-end"}
          spacing={2}
        >
          <Grid item>
            <Button
              variant="contained"
              endIcon={<OpenInFullIcon />}
              onClick={() => {
                navigate(`/appointments/appointment/${appointment.id}`);
              }}
            >
              View Full
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              endIcon={<CloseIcon />}
              onClick={onClose}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default AppointmentDisplay;