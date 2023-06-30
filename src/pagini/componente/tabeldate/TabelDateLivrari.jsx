import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'; 
import img13 from './images/search.png';
import img32 from "./images/upload.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './tabeldatelivrari.scss'



function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}


function subtotal(items) {
  return items.map(({  cost }) =>  cost).reduce((sum, i) => sum + i, 0);
}


const TabelDateLivrari = () => {
  const [row, setRow] = useState({
    produs: "",
    cantitate: "",
    cost: "",
    livratpe: "",
    tara: "",
    regiune: "",
    oras: "",
    adresa: "",
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
    await axios.delete(`http://localhost:8800/livrari/${id}`);
    window.location.reload()
  } catch (err) {
    console.log(err);
  }
};


useEffect(() => {
  const fetchAllRows = async () => {
    try {
      const res = await axios.get("http://localhost:8800/livrari");
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
    const res = await axios.post("http://localhost:8800/livrari", {
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
  console.log(calculatedSubtotal); 
  setInvoiceSubtotal(calculatedSubtotal);
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
            <TableCell align="center" colSpan={3}>Plata</TableCell>
            <TableCell align="center" colSpan={5}>Transport</TableCell>
          </TableRow>
          <TableRow>
          <TableCell align="center">ID</TableCell>
          <TableCell align="center">Imagine</TableCell>
            <TableCell align="center">Produs</TableCell>
            <TableCell align="center">Cantitate</TableCell>
            <TableCell align="center">De plata</TableCell>
            <TableCell align="center">Data livrare</TableCell>
            <TableCell align="center">Tara</TableCell>
            <TableCell align="center">Regiune</TableCell>
            <TableCell align="center">Oras</TableCell>
            <TableCell align="center" >Adresa</TableCell>
            <TableCell align="center" colSpan={3} rowSpan={3}>Actiuni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.filter((row) => row.produs.toLowerCase().includes(search.toLowerCase())) .map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.id}</TableCell>
        <TableCell align='center'><img src={"http://localhost:8800//upload/" + row.icon}alt="" /></TableCell>
        <TableCell align="center">{row.produs}</TableCell>
        <TableCell align="center">{row.cantitate}</TableCell>
        <TableCell align="center">{row.cost}</TableCell>
        <TableCell align="center">{row.livratpe}</TableCell>
        <TableCell align="center">{row.tara}</TableCell>
        <TableCell align="center">{row.regiune}</TableCell>
        <TableCell align="center">{row.oras}</TableCell>
        <TableCell align="center">{row.adresa}</TableCell>
        <TableCell align="center">
         <div className="butoane"><Link to={`/modificalivrari/${row.id}`} style={{ color: "inherit", textDecoration: "none" }}>
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
    <TableCell colSpan={2}>Total</TableCell>
    <TableCell align="center">{ccyFormat(invoiceSubtotal)}</TableCell>
    <TableCell colSpan={6} />
  </TableRow>
  </TableBody>
      </Table> 
    </TableContainer>
    <h2 className="versiunea1">Adauga o livrare</h2>
     <form className='formular' >
     <label className="icon"><label htmlFor='file'><img  src={img32} alt="" className="icon" /></label></label>
                <input className='inputuri2' name="icon" type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}  />
       <input type="text" name="produs" value={row.produs} onChange={handleChange} placeholder="Produs" />
       <input type="text" name="cantitate" value={row.cantitate} onChange={handleChange} placeholder="Cantitate" />
       <input type="text" name="cost" value={row.cost} onChange={handleChange} placeholder="Cost" />
       <input type="date" name="livratpe" value={row.livratpe} onChange={handleChange} placeholder="Data Livrare" />
       <input type="text" name="tara" value={row.tara} onChange={handleChange} placeholder="Tara" />
       <input type="text" name="regiune" value={row.regiune} onChange={handleChange} placeholder="Regiune" />
       <input type="text" name="oras" value={row.oras} onChange={handleChange} placeholder="Oras" />
       <input type="text" name="adresa" value={row.adresa} onChange={handleChange} placeholder="Adresa" />
       <div className="butoane"><Button variant="contained" color="primary" onClick={handleClick}>Adauga</Button></div>
        </form>
    </div>
    
    )
  }


  

export default TabelDateLivrari