import React from 'react'
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import img32 from "./images/upload.png"
import axios from "axios";
import "./modificalivrari.scss"

const ModificaLivrari = () => {

    const [row, setRow] = useState({
        produs: "",
        cantitate: "",
        client: "",
        cost: "",
        livratpe: "",
        tara: "",
        regiune: "",
        oras: "",
        adresa: "",
    });


    const [file, setFile] = useState(null);
    const [error, setError] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

    const livrariId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setRow((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.put("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const iconUrl = await upload();
        try {
            await axios.put(`http://localhost:8800/livrari/${livrariId}`, {
                icon: file ? iconUrl : "",
                ...row,
            });
            navigate("/livrari");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };


  return (
    <div className='adaugaModificare'>
    <Sidebar />
    <div className="containerModificaLivrari">
      <Navbar />
      <div className="adaugareModificari">
        <div className="formInputContact">
          <h1>Modifica o comanda</h1><br></br><br></br>
          <div className="form">
      <form >
      <label><h3>Imagine</h3><label htmlFor='file'><img  src={img32} alt="" className="icon" /></label></label>
              <input className='inputuri2' name="icon" type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/><br></br>
        <input
          type="text"
          name="produs"
          onChange={handleChange}
          placeholder="Produs"
        /><br></br>
        <input
          type="text"
          name="cantitate"
          onChange={handleChange}
          placeholder="Cantitate"
        /><br></br>
               <input type="text" name="client"  onChange={handleChange} placeholder="Client" />
        <input type="text" name="cost"  onChange={handleChange} placeholder="Cost" />
   <input type="date" name="livratpe"  onChange={handleChange} placeholder="Data Livrare" />
   <input type="text" name="tara"  onChange={handleChange} placeholder="Tara" />
   <input type="text" name="regiune"  onChange={handleChange} placeholder="Regiune" />
   <input type="text" name="oras"  onChange={handleChange} placeholder="Oras" />
   <input type="text" name="adresa"  onChange={handleChange} placeholder="Adresa" /><br></br>
         <button onClick={handleClick}>Modifica</button>
  </form>
</div>
</div>
</div>
</div>
</div>
  )
}

export default ModificaLivrari