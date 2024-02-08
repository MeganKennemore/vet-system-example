import { useEffect, useState } from "react";
import { fetchAppointmentsByUserId } from "../api/AppointmentsApi";
import { AppointmentTooltip, Appointments, DateNavigator, DayView, MonthView, Scheduler, TodayButton, Toolbar, ViewSwitcher, WeekView } from "@devexpress/dx-react-scheduler-material-ui";
import { AppointmentMeta, ViewState } from "@devexpress/dx-react-scheduler";
import { IconButton } from "@mui/material";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { useNavigate } from "react-router-dom";
import { getAppointments } from "../util/LocalStorage";

interface ScheduleDisplayProps {
  userId?: string;
  onApptClick?: (e: object) => void;
  selectedAppt?: object;
  tooltip?: any;
  setLoading?: (tf: boolean) => void;
};

const ScheduleDisplay: React.FC<ScheduleDisplayProps> = (props) => {
  const { userId, onApptClick, selectedAppt, tooltip, setLoading } = props;
  const [userSchedule, setUserSchedule] = useState<any[]>([]);
  const [appointmentMeta, setAppointmentMeta] = useState<any>(undefined);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleLoading = (tf: boolean) => {
    if (!!setLoading) {
      setLoading(tf);
    }
  };

  useEffect(() => {
    handleLoading(true);
    if (userId) {
      fetchAppointmentsByUserId(userId).then((schedule) => {
        if (schedule.length === 0) {
          setUserSchedule([]);
        } else {
          setUserSchedule(schedule);
        }
        handleLoading(false);
      })
    } else {
      getAppointments().then((appts) => {
        if (appts instanceof Error) {
          // TODO: Proper error handling
        } else {
          setUserSchedule(appts);
        }
      });
      handleLoading(false);
    }

  }, [userId]);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const ApptComponent = (props: any) => {
    return (
      <Appointments.Appointment
        {...props}
        isShaded={!!selectedAppt ? selectedAppt === props.data : false}
        toggleVisibility={() => {toggleVisibility()}}
        onClick={(!!onApptClick || tooltip) ? (ev) => {
          if (!!onApptClick) {
            onApptClick(props.data);
          } else if (tooltip) {
            toggleVisibility();
            setAppointmentMeta(!!appointmentMeta? undefined : { target: ev?.target.parentElement.parentElement, data: props.data });
          }
          
        } : props.onClick}
        onAppointmentMetaChange={(item: AppointmentMeta) => {
          setAppointmentMeta({target: item.target, data: item.data});
        }}
      >
        {props.children}
      </Appointments.Appointment>
    );
  };

  const TooltipHeaderComponent = (props: any) => {
    const openAppointment = () => {
      handleLoading(true);
      setAppointmentMeta(undefined);
      toggleVisibility();
      navigate(`/appointments/appointment/${props.appointmentData.id}`);
      handleLoading(false);
    };

    return (
      <AppointmentTooltip.Header
        {...props}
      >
        <IconButton size="large" onClick={openAppointment}>
          <OpenInFullIcon />
        </IconButton>
      </AppointmentTooltip.Header>
    )
  };

  return (
    <Scheduler data={userSchedule}>
      <ViewState 
        defaultCurrentDate={new Date()}
        defaultCurrentViewName={userId ? "Day" : "Month"}
      />
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
      <AppointmentTooltip
        showCloseButton
        headerComponent={TooltipHeaderComponent}
        visible={tooltip ? visible : false}
        appointmentMeta={appointmentMeta as AppointmentMeta | undefined}
        onAppointmentMetaChange={(item: AppointmentMeta) => {
          setAppointmentMeta(undefined);
        }}
        onVisibilityChange={(visible) => {
          if (!visible) {
            setAppointmentMeta(undefined);
          }
          toggleVisibility();
        }}
      />
    </Scheduler>
  );
};

export default ScheduleDisplay;