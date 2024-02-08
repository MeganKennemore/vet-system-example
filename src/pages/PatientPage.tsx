import { CircularProgress, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../models/Patient";
import { fetchPatientById } from "../api/PatientsApi";
import PatientProfile from "../components/PatientProfile";
import MedicalRecords from "../components/MedicalRecords";
import MainBox from "../components/MainBox";

const PatientPage: React.FC = () => {
  const { patientId } = useParams();
  const [showLoading, setShowLoading] = useState(false);
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    setShowLoading(true);
    fetchPatientById(patientId).then((result) => {
      setPatient(result);
      setShowLoading(false);
    })
  }, [patientId]);

  return (
    <MainBox paddingTop={{xs: 8, md: 10}}>
      {showLoading ? (
        <CircularProgress />
      ) : (
        <>
          {!patient ? (
            <Typography>No patient with this id could be found</Typography>
          ) : (
            <Grid container spacing={2}>
              {/**
                * Profile section
              */}
              <Grid item xs={12}>
                <PatientProfile patient={patient}/>
              </Grid>
              {/**
                * Medical History Section
              */ }
              <Grid container item xs={12}>
                <MedicalRecords records={patient.records} />
              </Grid>
            </Grid>
          )}
        </>
      )}
    </MainBox>
  );
};

export default PatientPage;