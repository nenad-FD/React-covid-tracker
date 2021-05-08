import React from "react";
import "./Table.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

//useStyles
const useStyles = makeStyles({
  tableContainer: {
    height: "500px",
    overflow: "scroll",
    marginBottom: "2em",
  },
});

function TableComponent({ countries }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell align="right">Cases</StyledTableCell>
            <StyledTableCell align="right">Recovered</StyledTableCell>
            <StyledTableCell align="right">Deaths</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {countries.map((country) => (
            <StyledTableRow key={country.country}>
              <StyledTableCell component="th" scope="row">
                {country.country}
              </StyledTableCell>
              <StyledTableCell align="right">{country.cases}</StyledTableCell>
              <StyledTableCell align="right">
                {country.recovered}
              </StyledTableCell>
              <StyledTableCell align="right">{country.deaths}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
