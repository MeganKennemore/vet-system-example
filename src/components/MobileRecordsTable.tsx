import { Card, Grid, Paper, Typography } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ApptRecordHeaders } from "../models/Records";

interface MobileRecordsTableProps {
  tableName: string;
  tableHeaders: any;
  tableRows: any[];
  onTitleClick?: () => void;
};

const MobileRecordsTable: React.FC<MobileRecordsTableProps> = (props) => {
  const { tableName, tableHeaders, tableRows, onTitleClick } = props;
  return (
    <Paper sx={{p: 2}} variant={"outlined"} >
      <Typography
        sx={{ flex: '1 1 100%', display: "inline-flex", alignItems: "center", paddingBottom: 1.5  }}
        variant="h6"
        component="div"
        onClick={onTitleClick ? onTitleClick : undefined}
      >
       {tableName}
       {onTitleClick && (
        <KeyboardArrowUpIcon sx={{ margin: "auto", marginLeft: 1 }} />
       )}
      </Typography>
      {tableRows.length === 0 ? (
        <Typography>No Records available</Typography>
      ) : (      
        tableRows.map((row: any) => {
          let keys = Object.keys(tableHeaders);
          if (keys.includes("notes") && (!row.notes || row.notes === "")) {
            keys.splice(7, 1);
          }
          if (keys.includes("vitals") && (!row.vitals || row.vitals === "")) {
            keys.splice(6, 1);
          }

          return (
            <Card sx={{ mb: 2, p: 2 }}>
              <Grid container>
                {keys.map((key:any) => {
                  return (
                    <Grid item container flexDirection={"row"} justifyContent={"space-between"}>
                      <Grid item>
                        <Typography sx={{ fontWeight: "bold" }}>{tableHeaders[key]}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography>
                          {key.includes("date") && (row[key] && row[key] !== "") ? new Date(row[key]).toDateString() : row[key]}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Card>
          );
        })
      )}
    </Paper>
  );
};

export default MobileRecordsTable;