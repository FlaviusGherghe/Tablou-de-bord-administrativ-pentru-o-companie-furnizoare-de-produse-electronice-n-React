import "./sanatate.scss"
import Sidebar from "../componente/sidebar/Sidebar"
import Navbar from "../componente/navbar/Navbar"
import img32 from './images/upload.png';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

  const Sanatate = () => {

    const [file, setFile] = useState(null);
    const [sanatate, setSanatate] = useState({
      nume: "",
      tipangajare: "",
      departament: "",
      titlu: "",
      tipconcediu: "",
      date: "",
      dataintoarcere: "",
    });
  
    const handleChange = (e) => {
      setSanatate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
  
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
  
    const navigate = useNavigate();
  
    const handleClick = async (e) => {
      e.preventDefault();
      const docUrl = await upload();
      try {
        await axios.post("http://localhost:8800/sanatate",  {
          ...sanatate,
      documente: file ? docUrl : "",
        });
        navigate("/")
      } catch (err) {
        console.log(err);
      }
    };
    
    return (
      <div className="sanatate">
        <Sidebar/>
        <div className="containerSanatate">
          <Navbar/>
          <div className="tot">
          <div className="formular">
            <form  className='down'>
            <h1>Formular pentru concediu de odihna si concediu medical</h1><br></br><br></br>
            <label><h3>Nume</h3></label>
              <input className='inputuri' type="text" name='nume' onChange={handleChange}></input><br></br>
              <label><h3>Tipul de angajare</h3></label>
              <select name="tipangajare" id="angajaretip" onChange={handleChange} >
              <option value="normaintreaga">Cu norma intreaga</option>
              <option value="jumatatenorma">Cu jumatate de norma</option>
              <option value="ladistanta">La distanta</option>
              </select><br></br>
              <label><h3>Departament</h3></label>
              <select name="departament" id="departament" onChange={handleChange}  >
      <option value="marketing">Marketing</option>
      <option value="vanzari">Vanzari</option>
      <option value="produs">Produs</option>
      <option value="finanate">Finante</option>
      <option value="resurseumane">Resurse umane</option>
  </select><br></br>
              <label><h3>Titlu</h3></label>
              <input className='inputuri' name="titlu" type="text" onChange={handleChange}  ></input><br></br>
              <label> <h3>Tipul de concediu</h3></label><br></br>
              <select name="tipconcediu" id="tipconcediu" onChange={handleChange} >
              <option value="medical">Concediu medical</option>
              <option value="vacanta">Vacanta</option>
              <option value="maternitate">Concendiu de maternitate</option>
              <option value="paternitate">Concendiu de paternitate</option>
              <option value="concediuobisnuit">Concediu obisnuit</option>
              <option value="concediujumatedezi">Concendiu de jumatate de zi</option>
              <option value="lucrudeacasa">Lucru de acasa</option>
              </select><br></br>
              <label><h3>Data concediului</h3></label>
              <input className='inputuri2' type="date" name="date" onChange={handleChange} ></input><br></br>
              <label><h3> Data de intoarcere</h3></label>
              <input className='inputuri2' type="date" name="dataintoarcere" onChange={handleChange}></input><br></br>
              <label className="documente">Incarcati documentele relevante aici<label htmlFor='file'><img  src={img32} alt="" className="icon" /></label></label>
              <input className='inputuri2' name="documente" type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}  />
              <button type='submit' onClick={handleClick}>Trimite</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    )
  }
  export default Sanatate