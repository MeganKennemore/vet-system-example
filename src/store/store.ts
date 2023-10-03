import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import appReducer from '../features/app/AppSlice';
import appointmentReducer from '../features/appointments/AppointmentSlice';

const reducer = combineReducers({
  app: appReducer,
  appointment: appointmentReducer
});

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer
});
const persistor = persistStore(store);

export default () => {
  return { store: store, persistor: persistor };
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch