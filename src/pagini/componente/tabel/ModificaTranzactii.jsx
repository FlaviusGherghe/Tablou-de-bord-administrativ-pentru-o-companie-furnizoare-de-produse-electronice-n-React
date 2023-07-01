import React from 'react'
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import img32 from "./images/upload.png"
import axios from "axios";
import "./modificatranzactii.scss"

const ModificaTranzactii = () => {

    const [tranzactii, setTranzactii] = useState({
        
        produs: "",
        client: "",
        data: "",
        cantitate: "",
        plata: "",
        status: "",
      });
    
    
      const [file, setFile] = useState(null);
      const [error,setError] = useState(false)
    
      const location = useLocation();
      const navigate = useNavigate();
    
      const tranzactiiId = location.pathname.split("/")[2];
    
      const handleChange = (e) => {
        setTranzactii((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        const docUrl = await upload();
        try {
          await axios.put(`http://localhost:8800/tranzactii/${tranzactiiId}`,  {
            icon: file ? docUrl : "",
            ...tranzactii,
          });
          navigate("/");
        } catch (err) {
          console.log(err);
          setError(true);
        }
      };


  return (
    <div className='adaugaModificare'>
    <Sidebar />
    <div className="containerModificaTranzactii">
      <Navbar />
      <div className="adaugareModificari">
        <div className="formInputContact">
          <h1>Modifica o tranzactie</h1><br></br><br></br>
          <div className="form">
      <form className='inputuri' >
      <label><h3>Imagine</h3><label htmlFor='file'><img  src={img32} alt="" className="icon" /></label></label>
              <input className='inputuri2' name="icon" type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/>
        <input
          type="text"
          name="produs"
          onChange={handleChange}
          placeholder="Produs"
        />
        <input
          type="text"
          name="client"
          onChange={handleChange}
          placeholder="Client"
        />
        <input
          type="date"
          name="data"
          onChange={handleChange}
          placeholder="Data"
        />
        <input
          type="text"
          name="cantitate"
          onChange={handleChange}
          placeholder="Cantitate"
        />
         <select name="plata" id="plata" onChange={handleChange}>
              <option value="Card">Card</option>
              <option value="Ramburs">Ramburs</option>
              <option value="Rate">Rate</option>
            </select>
            <select name="status" id="status" onChange={handleChange}>
              <option value="In asteptare">In asteptare</option>
              <option value="Esuata">Esuata</option>
              <option value="Efectuata">Efectuata</option>
            </select>
         <button onClick={handleClick}>Modifica</button>
      </form>
    </div>
    </div>
    </div>
  </div>
  </div>

  )
}

export default ModificaTranzactii