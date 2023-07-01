import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./tabeldateproduse.scss"
import img13 from './images/search.png';
import img32 from "./images/upload.png"

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(cantitate, pret) {
  return cantitate * pret;
}

function createRow(desc, cantitate, produs, pret) {
  const price = priceRow(cantitate, pret);
  return {  desc, cantitate, produs, pret };
}

function subtotal(items) {
  return items.map(({  pret }) =>  pret).reduce((sum, i) => sum + i, 0);
}

const TabelDateComenzi = () => {

  const [row, setRow] = useState({
    produs: "",
    cantitate: "",
    pret: "",
  });

  const [search, setSearch] = useState("")

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [rows, setRows] = useState([]);
  const [nameList, setNameList] = useState([]);

  const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
  const [invoiceTaxes, setInvoiceTaxes] = useState(0);
  const [invoiceTotal, setInvoiceTotal] = useState(0);


const handleChange = (e) => {
  setRow((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8800/produse/${id}`);
    window.location.reload()
  } catch (err) {
    console.log(err);
  }
};


useEffect(() => {
  const fetchAllRows = async () => {
    try {
      const res = await axios.get("http://localhost:8800/produse");
      setRows(res.data);
      const fetchedNames = res.data.map(row => row.name);
      setNameList(fetchedNames.join(", "));
    } catch (err) {
      console.log(err.response.data);
    }
  };
  fetchAllRows();
}, []);


const upload = async () => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("/upload", formData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const handleClick = async (event) => {
  event.preventDefault();
  const iconUrl = await upload();
  try {
    const res = await axios.post("http://localhost:8800/produse", {
      icon: file ? iconUrl : "",
      ...row,
    });
    window.location.reload()
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  
  const calculatedSubtotal = subtotal(rows);
  const calculatedTaxes = TAX_RATE * calculatedSubtotal;
  const calculatedTotal = calculatedSubtotal + calculatedTaxes;

  console.log(calculatedSubtotal, calculatedTaxes, calculatedTotal); 

  setInvoiceSubtotal(calculatedSubtotal);
  setInvoiceTaxes(calculatedTaxes);
  setInvoiceTotal(calculatedTotal);
}, [rows]);


  return (
    <div className="tabel">
       <div className="cautare-container">
      <img className="icon" src={img13} alt=""/>
        <input name="cauta" type="text" placeholder="Cauta..." onChange={(e)=>setSearch(e.target.value)}/>
      </div>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="spanning table">
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={3}>
            Detalii
          </TableCell>
          <TableCell align="center" colSpan={3}>Pret</TableCell>
          <TableCell align="center" rowSpan={2}>Actiuni</TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="center">ID</TableCell>
        <TableCell align="center">Imagine produs</TableCell>
          <TableCell align="center">Produs</TableCell>
          <TableCell align="center">Cantitate</TableCell>
          <TableCell align="center">Pret pe bucata</TableCell>
          <TableCell align="center">Pret rotunjit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {rows.filter((row) => row.produs.toLowerCase().includes(search.toLowerCase())) .map((row) => (
    <TableRow key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell align='center'><img src={"http://localhost:8800//upload/" + row.icon}alt="" /></TableCell>
      <TableCell align="center">{row.produs}</TableCell>
      <TableCell align="center">{row.cantitate}</TableCell>
      <TableCell align="center">{row.pret}</TableCell>
      <TableCell align="center">{ccyFormat(row.pret)}</TableCell>
      <TableCell align="center">
       <div className="butoane"><Link to={`/modificaProduse/${row.id}`} style={{ color: "inherit", textDecoration: "none" }}>
          <Button variant="contained" color="primary" className="update">Modifica</Button>
        </Link>
        <Button variant="contained" color="primary" onClick={() => handleDelete(row.id)}>Sterge</Button></div>
      </TableCell>
    </TableRow>
  ))}
  
  <TableRow>
  <TableCell rowSpan={3} />
  <TableCell rowSpan={3} />
  <TableCell rowSpan={3} />
  <TableCell colSpan={2}>Subtotal</TableCell>
  <TableCell align="center">{ccyFormat(invoiceSubtotal)}</TableCell>
  <TableCell rowSpan={3} />
</TableRow>
<TableRow>
  <TableCell>TVA</TableCell>
  <TableCell align="center">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
  <TableCell align="center">{ccyFormat(invoiceTaxes)}</TableCell>
</TableRow>
<TableRow>
  <TableCell colSpan={2}>Total</TableCell>
  <TableCell align="center">{ccyFormat(invoiceTotal)}</TableCell>
</TableRow>
</TableBody>
    </Table> 
  </TableContainer>
  <h2 className="versiunea1">Adauga un produs</h2>
   <form className='formular' >
   <label className="icon"><label htmlFor='file'><img  src={img32} alt="" className="icon" /></label></label>
              <input className='inputuri2' name="icon" type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}  />
     <input type="text" name="produs" value={row.produs} onChange={handleChange} placeholder="Produs" />
     <input type="text" name="cantitate" value={row.cantitate} onChange={handleChange} placeholder="Cantitate" />
     <input type="text" name="pret" value={row.pret} onChange={handleChange} placeholder="Pret" />
     <div className="butoane"><Button variant="contained" color="primary" onClick={handleClick}>Adauga</Button></div>
      </form>
  </div>
  
  )
}

export default TabelDateComenzi