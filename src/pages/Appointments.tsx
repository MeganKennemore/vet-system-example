import { CircularProgress } from "@mui/material";
import ScheduleDisplay from "../components/ScheduleDisplay";
import { useState } from "react";
import MainBox from "../components/MainBox";

const Appointments: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  
  return (
    <MainBox>
      {showLoading ? (
        <CircularProgress />
      ) : (
        <ScheduleDisplay 
          tooltip={true}
          setLoading={setShowLoading}
          //tooltip={<AppointmentTooltip showCloseButton />}
        />
      )}
    </MainBox>
  );
};

export default Appointments;