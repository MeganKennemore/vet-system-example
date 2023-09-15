import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import storeItems from './store/store';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

const defaultTheme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const { store, persistor } = storeItems();
console.log(process.env.BASE_NAME);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <BrowserRouter basename={process.env.BASE_NAME}>
          <App />
        </BrowserRouter>
      </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
