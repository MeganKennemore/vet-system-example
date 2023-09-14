import { Grid, TableCell, TableCellProps, TableRow, Typography } from "@mui/material";
import { ApptRecord, MedicalCare, Records, Test, Vaccination } from "../models/Records"
import "./components-css/MedicalRecords.css"
import React, { ReactNode } from "react";
import RecordsTable from "./RecordsTable";

interface MedicalRecordsProps {
  records: Records;
};

interface CustomBodyCellProps extends TableCellProps {
  isFinalCell?: boolean
};

export const CustomBodyCell: React.FC<CustomBodyCellProps> = (props) => {
  return (
    <TableCell
      {...props}
      sx={{
        textAlign: props.isFinalCell ? "right" : "left",
        borderBottom: "none !important"
      }} 
    >
      {props.children}
    </TableCell>
  )
};

const LastCell: React.FC<TableCellProps> = (props) => {
  return (
    <TableCell
      {...props}
      sx={{
        textAlign: "right",
      }}
    >
      {props.children}
    </TableCell>
  )
};

const MedicalRecords: React.FC<MedicalRecordsProps> = (props) => {
  const { records } = props;
  
  const { appt_record, tests, vaccinations, medical_care } = records;

  const noRecords = (
    <TableRow>
      <TableCell colSpan={6}>
        <Typography>No Records available</Typography>
      </TableCell>
    </TableRow>
  ) as ReactNode;

  return (
    <Grid item container direction={"column"} spacing={2} justifyContent={"space-evenly"} alignItems={"stretch"}>
      {/* Appointment record */}
      <Grid item>
        {/* <AppointmentRecords appt_records={appt_record}/> */}
        <RecordsTable 
          tableName="Appointment Records"
          tableHeaders={[
            "Appointment ID",
            "Type",
            "Subtype",
            "Medical Status",
            "Date",
            "Review Date"
          ]}
          cellMapper={() => {
            if (appt_record.length === 0) {
              return noRecords;
            }
            return appt_record.map((record: ApptRecord, index) => {
              let vitals;
              let notes;
  
              if (record.vitals && record.vitals !== "") {
                vitals = [
                  <CustomBodyCell>Vitals:</CustomBodyCell>,
                  <CustomBodyCell colSpan={5}>{record.vitals}</CustomBodyCell>
                ];
              }
              if (record.notes && record.notes !== "") {
                notes = [
                  <CustomBodyCell>Notes:</CustomBodyCell>,
                  <CustomBodyCell colSpan={5}>{record.notes}</CustomBodyCell>
                ];
              }
  
              let mainRow = [
                <CustomBodyCell>{record.id}</CustomBodyCell>,
                <CustomBodyCell>{record.type}</CustomBodyCell>,
                <CustomBodyCell>{record.subtype ? record.subtype : ""}</CustomBodyCell>,
                <CustomBodyCell>{record.medical_status ? record.medical_status : ""}</CustomBodyCell>,
                <CustomBodyCell>{new Date(record.date).toDateString()}</CustomBodyCell>,
                <CustomBodyCell isFinalCell>{record.review_date ? new Date(record.review_date).toDateString() : ""}</CustomBodyCell>
              ];
  
              if (!vitals && !notes) {
                return (
                  <TableRow>
                    {mainRow.map((cell) => cell)}
                  </TableRow>
                );
              }
  
              let allRows = [<TableRow>{mainRow.map((cell) => cell)}</TableRow>];
  
              if (vitals) {
                allRows.push(
                  <TableRow sx={ !notes ? { borderBottom: "1px solid rgba(224, 224, 224, 1)"} : {}}>
                    {vitals.map((cell) => cell)}
                  </TableRow>
                );
              }
  
              if (notes) {
                allRows.push(
                  <TableRow sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)"}}>
                    {notes.map((cell) =>  cell)}
                  </TableRow>
                );
              }
  
              return allRows as ReactNode;
            });
          }}
          labelPrefix="appt"
        />
      </Grid>
      {/* Test Records */}
      <Grid item>
        <RecordsTable 
          tableName="Test Records"
          tableHeaders={[
            "Test",
            "Test For Condition",
            "Result",
            "Test Date",
            "Result Date",
            "Re-Test Date",
            "Associated Appointment"
          ]}
          cellMapper={() => {
            if (tests.length === 0) {
              return noRecords;
            }
            return tests.map((record: Test, index) => {
              return (
                <TableRow key={`tests-table-row-${index}`}>
                  <TableCell>{record.test_name}</TableCell>
                  <TableCell>{record.test_for_condition}</TableCell>
                  <TableCell>{record.result}</TableCell>
                  <TableCell>{new Date(record.test_date).toDateString()}</TableCell>
                  <TableCell>{new Date(record.result_date).toDateString()}</TableCell>
                  <TableCell>{new Date(record.re_test_date).toDateString()}</TableCell>
                  <LastCell>{record.appt_id}</LastCell>
                </TableRow>
              ) as ReactNode;
            });
          }}
          labelPrefix={"tests"}
        />
      </Grid>
      {/* Vaccinations Records */}
      <Grid item>
        <RecordsTable 
          tableName="Vaccination Records"
          tableHeaders={[
            "Vaccination",
            "Type",
            "Vaccination Date",
            "Re-Vaccinate Date",
            "Lot Number",
            "Associated Appointment"
          ]}
          cellMapper={() => {
            if (vaccinations.length === 0) {
              return noRecords
            }
            return vaccinations.map((record: Vaccination, index) => {
              return (
                <TableRow key={`vaccines-table-row-${index}`}>
                  <TableCell>{record.vaccination_name}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{new Date(record.vac_date).toDateString()}</TableCell>
                  <TableCell>{new Date(record.re_vac_date).toDateString()}</TableCell>
                  <TableCell>{record.lot_number ? record.lot_number : ""}</TableCell>
                  <LastCell>{record.appt_id}</LastCell>
                </TableRow>
              ) as ReactNode;
            })
          }}
          labelPrefix="vaccines"
        />
      </Grid>
      {/* Medical Care records */}
      <Grid item>
        <RecordsTable 
          tableName="Records of Medical Care"
          tableHeaders={[
            "Medical Care",
            "Type",
            "Doses/Recurrences",
            "For",
            "Care Date",
            "Review Date",
            "Associated Appointment"
          ]}
          cellMapper={() => {
            if (medical_care.length === 0) {
              return noRecords;
            }
            return medical_care.map((record: MedicalCare, index) => {
              return (
                <TableRow key={`medical-care-table-row-${index}`}>
                  <TableCell>{record.care}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell>{record.doses_or_recurrences ? record.doses_or_recurrences : ""}</TableCell>
                  <TableCell>{record.for ? record.for : ""}</TableCell>
                  <TableCell>{new Date(record.care_date).toDateString()}</TableCell>
                  <TableCell>{record.review_date ? new Date(record.review_date).toDateString() : ""}</TableCell>
                  <LastCell>{record.appt_id}</LastCell>
                </TableRow>
              ) as ReactNode;
            });
          }}
          labelPrefix="medical-care"
        />
      </Grid>
    </Grid>
  )
};

export default MedicalRecords;