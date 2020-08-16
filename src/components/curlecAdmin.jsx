import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


const axiosHead = "https://uat.curlec.com/CurlecFormBuilder/DemoApp/";

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
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function handleGetCompanies() {
    var axiosLink = axiosHead + "write";
    var companies = [];
    axios
        .get(axiosLink)
        .then(response => {
            console.log("received")
            companies = response.data.split(" ")
            return companies
        })
}

export default function CurlecAdmin() {

    const classes = useStyles();

    const [companies, setCompanies] = useState([]);

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    return (
        <TableContainer component={Paper}>
            {console.log("CHECK", handleGetCompanies)}
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Company Name</StyledTableCell>
                        <StyledTableCell align="right">Admin Link</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.map((company) => (
                        <StyledTableRow key={company}>
                            <StyledTableCell component="th" scope="row">
                                {company}
                            </StyledTableCell>
                            {/* <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}