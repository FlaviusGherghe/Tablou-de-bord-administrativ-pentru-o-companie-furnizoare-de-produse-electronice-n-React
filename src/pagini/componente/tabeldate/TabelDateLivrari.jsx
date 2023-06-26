import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './tabeldatelivrari.scss'

function createData(name, country, region, city, adress, price) {
  return {
    name,
    country,
    region,
    city,
    adress,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: 'Ion Motorga',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Tiberiu Danciu',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.country}</TableCell>
        <TableCell align="right">{row.region}</TableCell>
        <TableCell align="right">{row.city}</TableCell>
        <TableCell align="right">{row.adress}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Istoric
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell align="right">Cantitate</TableCell>
                    <TableCell align="right">Pret Total(RON)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    country: PropTypes.number.isRequired,
    city: PropTypes.number.isRequired,
    region: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    adress: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('DELL MONITOR 4K', "Romania", "Oltenia", "Craiova", "Bulevardul Decebal nr.2", 3.99),
  createData('Sistem desktop ASUS', "Romania", "Muntenia", "Bucuresti", "Piața Ștefan cel Mare și Sfânt, nr. 1", 4.99),
  createData('Mouse Ryzen', "Romania", "Moldova", "Iasi", "Strada 14 Decembrie 1989 nr. 7", 3.79),
  createData('Boxe hama', "Germania", "Rheinland-Pfalz", "Berlingen", "Lützowplatz 85", 2.5),
  createData('Microsoft keyboard', "Germania", "Rheinland-Pfalz", "Oberhausen An Der Appel", "Anhalter Strasse 47", 1.5),
];

const TabelDateLivrari = () => {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Produse</TableCell>
            <TableCell align="right">Tara</TableCell>
            <TableCell align="right">Regiune</TableCell>
            <TableCell align="right">Oras</TableCell>
            <TableCell align="right">Adresa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TabelDateLivrari