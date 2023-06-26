import React from 'react'
import "./tabeldatecomenzi.scss"
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

function createData(name, country, region, city, adress, price, estimativ) {
    return {
      name,
      country,
      region,
      city,
      adress,
      price,
      estimativ: [
       
        {
          date: '2020-01-05',
          customerId: 'Anastasia Maria',
          amount: 3,
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
                  Estimat livrare
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date.est</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell align="right">Cantitate</TableCell>
                      <TableCell align="right">Pret Total(RON)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.estimativ.map((estimativRow) => (
                      <TableRow key={estimativRow.date}>
                        <TableCell component="th" scope="row">
                          {estimativRow.date}
                        </TableCell>
                        <TableCell>{estimativRow.customerId}</TableCell>
                        <TableCell align="right">{estimativRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(estimativRow.amount * row.price * 100) / 100}
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
      estimativ: PropTypes.arrayOf(
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
    createData('Desktop Serioux', "Olanda", "Noord-Holland", "Amsterdam","De Boelelaan 1105", 14.99),
    createData('Sistem desktop ASUS',"Romania", "Muntenia", "Bucuresti","Piața Ștefan cel Mare și Sfânt, nr. 1", 7.99),
    createData('Laptop',"Romania", "Transilvania", "Cluj","Strada 14 Decembrie 1989 nr. 7", 8.79),
    createData('Boxe hama', "Italia", "Lazio", "Roma"," Via Carlo Alberto 143", 3.85),
    createData('Casti sony', "Franta", "Île-de-France", "Paris An Der Appel","Anhalter Strasse 47", 6.45),
  ];

const TabelDateProduse = () => {
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
  )
}

export default TabelDateProduse