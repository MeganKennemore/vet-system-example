import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CircularProgress, Container, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField, Theme, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { Patient, getIntactLanguage } from "../models/Patient";
import "./pages-css/PatientRecords.css";
import { useNavigate } from "react-router-dom";
import { fetchAllPatients, fetchAllSpecies, filterPatients } from "../api/PatientsApi";
import { getPatientImageSrcAlt, makeProperNoun } from "../util/VisualHelper";

const PatientRecords: React.FC = () => {
  const isLargerDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [dataInUse, setDataInUse] = useState<Patient[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  // Filter metadata values
  const [species, setSpecies] = useState<string[]>([""]);
  // Filter values
  const [filterValues, setFilterValues] = useState({
    patientName: "",
    ownerName: "",
    species: ""
  });

  useEffect(() => {
    setShowLoading(true);
    fetchAllPatients().then((patients) => {
      setDataInUse(patients);
      fetchAllSpecies().then((speciesList) => {
        let blank = [''];
        setSpecies(blank.concat(speciesList));
        if (Object.keys(filterValues).join("") !== "") {
          setFilterValues({
            patientName: "",
            ownerName: "",
            species: ""
          });
        }
        setShowLoading(false);
      });
    });
  }, []);

  const onFilterChange = (filter: "patientName" | "ownerName" | "species", value: any) => {
    let tempVal = {...filterValues};
    tempVal[filter] = value;
    setFilterValues(tempVal);
  };

  const clearFilters = () => {
    setShowLoading(true);
    setFilterValues({
      patientName: "",
      ownerName: "",
      species: ""
    });
    fetchAllPatients().then((patients) => {
      setDataInUse(patients);
      setShowLoading(false);
    });
  };

  const runSearch = () => {
    setShowLoading(true);
    filterPatients(filterValues).then((results: Patient[]) => {
      setDataInUse(results);
      setShowLoading(false);
    });
  };
  
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
          md: 8
        }, 
        width: { 
          xs: "100%", 
          md: `calc(100% - 240px)` 
        } 
      }}
    >
      <Box className="filter-card-holder">
        <Card sx={{ p: 1 }}>
          <CardHeader 
            title={"Filter and Sort"} 
            titleTypographyProps={{variant: "h6"}}
            sx={{ paddingTop: 1.5, paddingBottom: 0}}
          />  
          <CardContent>
            <Grid 
              container 
              flexDirection={isLargerDevice ? "row" : "column"} 
              justifyContent={isLargerDevice ? "space-between" : "flex-start"} 
              alignItems={"stretch"} 
              spacing={1}
            >
              {/* Patient Name */}
              <Grid item xs={12} md={4}>
                <TextField 
                  id="patient-name-filter"
                  label="Patient Name"
                  variant="outlined"
                  value={filterValues.patientName}
                  fullWidth
                  onChange={(ev) => onFilterChange("patientName", ev.target.value)}
                />
              </Grid>
              {/* Owner Name */}
              <Grid item xs={12} md={4}>
                <TextField
                  id="owner-name-filter"
                  label="Owner's Last Name"
                  variant="outlined"
                  value={filterValues.ownerName}
                  fullWidth
                  onChange={(ev) => onFilterChange("ownerName", ev.target.value)}
                />
              </Grid>
              {/* Species */}
              <Grid item xs={12} md={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="species-filter-label">Species</InputLabel>
                  <Select
                    labelId="species-filter-label"
                    id="species-filter"
                    label="Species"
                    value={filterValues.species}
                    onChange={(ev) => onFilterChange("species", ev.target.value)}
                  >
                    {species.map((spe: string) => {
                      if (spe === "") {
                        return (
                          <MenuItem key={"select-option-empty"} value={spe}>None</MenuItem>
                        );
                      }
                      return (
                        <MenuItem key={`select-option-${spe}`} value={spe}>{makeProperNoun(spe)}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 2 }}>
            <Grid 
              container
              flexDirection={isLargerDevice ? "row" : "column"} 
              spacing={1}
            >
              <Grid 
                container
                flexDirection={"row"}
                justifyContent={"space-between"} 
                spacing={1}
              >
                <Grid item>
                  <Button variant="outlined" onClick={clearFilters}>Clear Filters</Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="contained"
                    onClick={runSearch}
                    disabled={filterValues.patientName === "" && filterValues.ownerName === "" && filterValues.species === ""}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                Sorting TBC
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Box>
      <Box>
        {showLoading ? (
          <CircularProgress sx={{ position: "absolute", right: { xs: "45%", md: "50%" }, bottom: { xs: "-25%", md: "-80%" } }}/>
          ) : (
          <List>
            {dataInUse.length === 0 && (
              <ListItem>
                <ListItemText content="No records available"/>
              </ListItem>
            )}
            {dataInUse.length > 0 && (
              dataInUse.map((patient: Patient, index) => {
                const makeAvatar = () => {
                  const { src, alt } = getPatientImageSrcAlt(patient);
                  return (
                    <Avatar sizes="large" variant="square" alt={alt} src={src} />
                  );
                };

                return (
                  <ListItem style={{ width: "100%" }} key={`patient-${patient.patient_name}-${index}`}>
                    <Card style={{ width: "100%" }} onClick={() => {navigate(`/patient-records/patient/${patient.patient_id}`)}}>
                      <CardActionArea>
                        <CardHeader 
                          avatar={makeAvatar()} 
                          title={patient.patient_name}
                          titleTypographyProps={{variant: "h6"}}
                          subheader={`${getIntactLanguage(patient)} ${patient.sex} ${makeProperNoun(patient.species)}`}
                        />
                        <CardContent>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography variant="body2"><b>Primary Owner:</b> {patient.owner_primary.first_name} {patient.owner_primary.last_name}</Typography>
                            </Grid>
                            {!!patient.owner_secondary && (
                              <Grid item>
                                <Typography variant="body2"><b>Secondary Owner:</b> {patient.owner_secondary.first_name} {patient.owner_secondary.last_name}</Typography>
                              </Grid>
                            )}
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </ListItem>
                );
              })
            )}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default PatientRecords;