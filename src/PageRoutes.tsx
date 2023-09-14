import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import PatientRecords from './pages/PatientRecords';
import PatientPage from './pages/PatientPage';

const PageRoutes: React.FC = () => {

  return (
    <Routes>
      <Route path="/">
        <Route path="home" element={<Home />} />
        <Route path="patient-records">
          <Route path="" element={<PatientRecords />} />
          <Route path="patient/:patientId" element={<PatientPage />} />
        </Route>     
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
};

export default PageRoutes;