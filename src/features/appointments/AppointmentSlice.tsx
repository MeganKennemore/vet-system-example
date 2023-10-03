import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store';
import { Appointments } from '../../models/Appointments';

interface AppointmentState {
  appointments: Appointments[];
};

const startingState: AppointmentState = {
  appointments: []
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: startingState,
  reducers: {
    clearAppointments: (state) => {
      state.appointments = [];
    },
    setAppointments: (state, action: PayloadAction<Appointments[]>) => {
      state.appointments = action.payload;
    }
  }
});

export const {
  clearAppointments,
  setAppointments
} = appointmentSlice.actions;

export const selectAppointments = (state: RootState) => state.appointment.appointments;

export default appointmentSlice.reducer;