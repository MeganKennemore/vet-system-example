import { Box, CircularProgress, Container, Divider, Grid, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../models/Patient";
import { fetchPatientById } from "../api/PatientsApi";
import PatientProfile from "../components/PatientProfile";
import MedicalRecords from "../components/MedicalRecords";

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
    <Box 
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
          md: 10,
        }, 
        width: { 
          xs: "100%", 
          md: `calc(100% - 240px)` 
        } 
      }}
    >
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
    </Box>
  );
};

export default PatientPage;