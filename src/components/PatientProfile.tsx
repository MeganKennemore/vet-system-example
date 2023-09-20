import { Button, Divider, Grid, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Patient, getIntactLanguage } from "../models/Patient";
import { formatPhoneNumber, getPatientImageSrcAlt, makeProperNoun } from "../util/VisualHelper";
import { Owner } from "../models/Owner";
import EditIcon from '@mui/icons-material/Edit';

interface PatientProfileProps {
  patient: Patient;
}

const PatientProfile: React.FC<PatientProfileProps> = (props) => {
  const { patient } = props;
  const theme = useTheme();
  let isXsDevice = useMediaQuery(theme.breakpoints.down('sm'));
  let { src, alt } = getPatientImageSrcAlt(patient);

  const makeOwnerContactInfo = (owner: Owner, isPrimary: boolean) => {
    return (
      <Grid item container xs={12} sm={6} direction={"column"} alignItems={"space-evenly"}>
        <Grid item>
          <Typography><b>{isPrimary ? "Primary Owner" : "Secondary Owner"}:</b> </Typography>
        </Grid>
        <Grid item>
          <Typography>{owner.first_name} {owner.last_name}</Typography>
          <Typography>{formatPhoneNumber(owner.phone_one)}</Typography>
          {owner.phone_two && (
            <Typography>{formatPhoneNumber(owner.phone_two)}</Typography>
          )}
          {owner.email && (
            <Typography>{owner.email}</Typography>
          )}
        </Grid>
      </Grid>
    );
  };

  const calculateAnimalAge = (birthdate: string) => {
    let today = new Date();
    let date = new Date(birthdate);
    let months = (today.valueOf() - date.valueOf()) / 2629746000;
    if (months < 12) {
      return `${Math.floor(months)} months`;
    }
    let extraMonths = months % 12;
    if (extraMonths < 0) {
      return `${Math.floor(months / 12)} years`
    }
    return `${Math.floor(months / 12)} yrs ${Math.floor(extraMonths)} mo`;
  };

  return (
    <Paper>
      <Grid container flexDirection={"column"} spacing={1} padding={2}>
        <Grid item container xs={12} sm={12} direction={isXsDevice ? "column" : "row"}>
          <Grid item xs={12} sm={3} xl={2}>
            <img src={src} alt={alt} width={isXsDevice ? "100%" : "80%"}/>
          </Grid>
          <Grid item container xs={12} sm={9} xl={10} direction={isXsDevice ? "column" : "row"}>
            <Grid item container xs={12} sm={6} xl={6} direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"}>
              {/* Animal Name */}
              <Grid item style={{ height: "min-content"}}>
                <Typography variant={"h3"}>{patient.patient_name}</Typography>
              </Grid>
              <Grid item container spacing={{xs: 1.5, xl: 3}} direction={"row"} >
                {/* Animal Basic info */}
                <Grid item xs={"auto"}>
                  <Typography>{`${getIntactLanguage(patient)} ${patient.sex} ${makeProperNoun(patient.species)}`}</Typography>
                  <Typography>{calculateAnimalAge(patient.birthdate)}</Typography>
                  {patient.breed && (
                    <Typography>{patient.breed}</Typography>
                  )}
                </Grid>
                {/* Animal Warnings */}
                {patient.warnings.length > 0 && (
                  <Grid item  xs={"auto"}>
                    {patient.warnings.map((warn: string) => {
                      return (
                        <Typography color={theme.palette.error.main}>
                          <b>{warn}</b>
                        </Typography>
                      )
                    })}
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Divider orientation={isXsDevice ? "horizontal" : "vertical"} />
            {/* Owner contact info */}
            <Grid item container xs={12} sm={5} xl={5} padding={1} direction={"column"}>
              {makeOwnerContactInfo(patient.owner_primary, true)}
              {patient.owner_secondary && (
                makeOwnerContactInfo(patient.owner_secondary, false)
              )}
            </Grid>
          </Grid>
        </Grid>
        <Divider>
          <Button endIcon={<EditIcon />}>
            Notes
          </Button> 
        </Divider>
        <Grid item xs={12}>
          <TextField 
            id="patient-notes"
            variant="outlined"
            multiline
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            value={patient.notes}
          />
        </Grid>
      </Grid>
    </Paper>
  )
};

export default PatientProfile;