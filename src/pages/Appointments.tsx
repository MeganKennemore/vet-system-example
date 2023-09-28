import { Box } from "@mui/material";
import ScheduleDisplay from "../components/ScheduleDisplay";
import { useAppSelector } from "../store/hooks";
import { selectLoggedInUser } from "../features/app/AppSlice";

const Appointments: React.FC = () => {
  
  const loggedInUser = useAppSelector(selectLoggedInUser);

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
      HI THIS IS APPOINTMENTS
      <ScheduleDisplay userId={loggedInUser?.user_id || "t-001"}/>
    </Box>
  );
};

export default Appointments;