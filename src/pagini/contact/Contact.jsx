
import "./contact.scss"
import Sidebar from '../componente/sidebar/Sidebar'
import Navbar from '../componente/navbar/Navbar'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


const Contact = () => {

  const ref = useRef()
  const [success, setSuccess] = useState(null)


  const [contact, setContact] = useState({
    name: "",
    email: "",
    departament: "",
    locatie: "",
    subiect: "",
    mesaj: "",
  });

  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/contact", contact);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div className="contact">
      <Sidebar />
      <div className="contactContainer">
        <Navbar />

        <div className="catPag">
          <form  className="formInputContact" >
            <h1>Contactati-ne</h1><br></br><br></br>
            <label><h3>Nume</h3></label>
            <input className='inputuri' type="text" name='name' onChange={handleChange} ></input><br></br>
            <label><h3>Email</h3></label>
            <input className='inputuri' id="email" name='email' onChange={handleChange} ></input><br></br>
            <label><h3>Departament</h3></label><br></br>
            <select name="departament" id="departament" onChange={handleChange}>
              <option value="marketing">Marketing</option>
              <option value="vanzari">Vanzari</option>
              <option value="produs">Produs</option>
              <option value="finanate">Finante</option>
              <option value="resurseumane">Resurse umane</option>
            </select>
            <br></br>
            <label><h3>Locatie</h3></label>
            <input className='inputuri' id="locatie" name='locatie' onChange={handleChange} ></input><br></br>
            <label><h3>Subiect</h3></label>
            <input className='inputuri' id="subiect" name='subiect' onChange={handleChange} ></input><br></br>
            <textarea className='inputuri' placeholder='Descrie problemele' name='mesaj' onChange={handleChange} />
            <button type='submit' onClick={handleClick}>Trimite</button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Contact