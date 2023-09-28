import { useEffect, useState } from "react";
import { fetchAppointmentsByUserId } from "../api/AppointmentsApi";
import { Appointments, DayView, Scheduler } from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";

interface ScheduleDisplayProps {
  userId: string;
  onApptClick?: (e: object) => void;
 selectedAppt?: object;
};

const ScheduleDisplay: React.FC<ScheduleDisplayProps> = (props) => {
  const { userId, onApptClick, selectedAppt } = props;
  const [userSchedule, setUserSchedule] = useState<any[]>([]);

  useEffect(() => {
    fetchAppointmentsByUserId(userId).then((schedule) => {
      if (schedule.length === 0) {
        setUserSchedule([]);
      } else {
        setUserSchedule(schedule);
      }
    })
  }, [userId]);

  const ApptComponent = (props: any) => {
    return (
      <Appointments.Appointment
        {...props}
        isShaded={!!selectedAppt ? selectedAppt === props.data : false}
        onClick={() => {
          if (!!onApptClick) {
            onApptClick(props.data);
          }
        }}
      >
        {props.children}
      </Appointments.Appointment>
    );
  };

  return (
    <Scheduler data={userSchedule}>
      <ViewState currentDate={new Date()}/>
      <DayView 
        startDayHour={7}
        endDayHour={17}
      />
      <Appointments appointmentComponent={ApptComponent} />
    </Scheduler>
  );
};

export default ScheduleDisplay;