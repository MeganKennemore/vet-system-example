import { Box, CircularProgress, Container, Modal, Typography } from "@mui/material";
import AppointmentDisplay from "../components/AppointmentDisplay";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Appointments } from "../models/Appointments";
import { useAppSelector } from "../store/hooks";
import { selectAppointments } from "../features/appointments/AppointmentSlice";
import { fetchAppointmentByApptId } from "../api/AppointmentsApi";
import MainBox from "../components/MainBox";

const AppointmentPage: React.FC = () => {
  const { apptId } = useParams();
  const [appointment, setAppointment] = useState<Appointments | undefined>();
  const [showLoading, setShowLoading] = useState(true);
  const allAppointments = useAppSelector(selectAppointments);

  useEffect(() => {
    setShowLoading(true);
    if (apptId && allAppointments) {
      fetchAppointmentByApptId(allAppointments, apptId).then((appt) => {
        setAppointment(appt);
        setShowLoading(false);
      })
    } else {
      setAppointment(undefined);
      setShowLoading(false);
    }
  }, [apptId, allAppointments]);

  if (showLoading) {
    return (
      <MainBox height="100%">
        <CircularProgress sx={{ position: "absolute", right: { xs: "45%", md: "50%" }, bottom: { xs: "-25%", md: "45%" } }}/>
      </MainBox>
    );
  }

  return (
    <MainBox>
      {!!appointment ? (
        <AppointmentDisplay appointment={appointment} onClose={() => {return;}} />
      ) : (
        <Typography color="error">Error fetching appointment</Typography>
      )}
    </MainBox>
  );
};
export default AppointmentPage;