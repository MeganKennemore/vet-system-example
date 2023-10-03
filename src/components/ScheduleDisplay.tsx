import { useEffect, useState } from "react";
import { fetchAppointmentsByUserId } from "../api/AppointmentsApi";
import { Appointments, DateNavigator, DayView, MonthView, Scheduler, TodayButton, Toolbar, ViewSwitcher, WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { useAppSelector } from "../store/hooks";
import { selectAppointments } from "../features/appointments/AppointmentSlice";

interface ScheduleDisplayProps {
  userId?: string;
  onApptClick?: (e: object) => void;
  selectedAppt?: object;
};

const ScheduleDisplay: React.FC<ScheduleDisplayProps> = (props) => {
  const { userId, onApptClick, selectedAppt } = props;
  const [userSchedule, setUserSchedule] = useState<any[]>([]);
  const allAppointments = useAppSelector(selectAppointments);

  useEffect(() => {
    if (userId) {
      fetchAppointmentsByUserId(allAppointments, userId).then((schedule) => {
        if (schedule.length === 0) {
          setUserSchedule([]);
        } else {
          setUserSchedule(schedule);
        }
      })
    } else {
      setUserSchedule(allAppointments);
    }
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
      <ViewState 
        defaultCurrentDate={new Date()}
        defaultCurrentViewName={userId ? "Day" : "Month"}
/*         onCurrentViewNameChange={!!onSetView ? (newViewName) => {
          onSetView(newViewName);
        } : undefined} *//>
      {!userId && (
        [
          <Toolbar />,
          <DateNavigator />,
          <TodayButton />,
          <ViewSwitcher />,
          <MonthView />,
          <WeekView startDayHour={7} endDayHour={17} />
        ]
      )}
      <DayView 
        startDayHour={7}
        endDayHour={17}
      />
      <Appointments appointmentComponent={ApptComponent} />
    </Scheduler>
  );
};

export default ScheduleDisplay;