import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface RecordsTableProps {
  tableName: string;
  tableHeaders: string[];
  cellMapper: () => (ReactNode[] | ReactNode);
  labelPrefix: string;
};

const RecordsTable: React.FC<RecordsTableProps> = (props) => {
  const { tableName, tableHeaders, cellMapper, labelPrefix } = props;
  const theme = useTheme();
  let columnWidth = Math.floor(100 / tableHeaders.length);

  return (
    <Paper sx={{p: 2}}>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id={`${labelPrefix}-table-title`}
        component="div"
      >
       {tableName}
      </Typography>
      <TableContainer aria-label={`${labelPrefix}-table-container`}>
        <Table aria-label={`${labelPrefix}-table`}>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => {
                let textAlign = "left";
                if (index === tableHeaders.length - 1) {
                  textAlign = "right";
                }
                return (
                  <TableCell 
                    /* style={{ width: `${columnWidth}%`}}
                    className={"appt-custom-header-cell"} */
                    key={`${labelPrefix}-header-cell-${index}`}
                    sx={{
                      fontWeight: "bold",
                      textAlign: textAlign,
                      backgroundColor: `rgba(2, 136, 209, 0.3)`,
                      borderBottomColor: `rgba(2, 136, 209, 0.7)`
                    }}
                  >
                    {header}
                  </TableCell> 
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {cellMapper()}
          </TableBody>
        </Table>
       </TableContainer>
    </Paper>
  );
};

export default RecordsTable;