import { CircularProgress, Typography } from "@mui/material";
import AppointmentDisplay from "../components/AppointmentDisplay";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppointmentModel } from "../models/Appointments";
import { fetchAppointmentByApptId } from "../api/AppointmentsApi";
import MainBox from "../components/MainBox";

const AppointmentPage: React.FC = () => {
  const { apptId } = useParams();
  const [appointment, setAppointment] = useState<AppointmentModel | undefined>();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    setShowLoading(true);
    if (apptId) {
      fetchAppointmentByApptId(apptId).then((appt) => {
        setAppointment(appt);
        setShowLoading(false);
      })
    } else {
      setAppointment(undefined);
      setShowLoading(false);
    }
  }, [apptId]);

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