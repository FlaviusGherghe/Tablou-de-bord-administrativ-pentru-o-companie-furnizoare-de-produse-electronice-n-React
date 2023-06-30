import React from 'react'
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import img32 from "./images/upload.png"
import axios from "axios";
import "./modificaproduse.scss"

const ModificaProduse = () => {

    const [produse, setproduse] = useState({
        produs: "",
        cantitate: "",
        pret: "",
    });


    const [file, setFile] = useState(null);
    const [error, setError] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

    const produseId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setproduse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            await axios.put(`http://localhost:8800/produse/${produseId}`, {
                icon: file ? iconUrl : "",
                ...produse,
            });
            navigate("/produse");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };



    return (
        <div className='adaugaModificare'>
        <Sidebar />
        <div className="containerModificaProduse">
          <Navbar />
          <div className="adaugareModificari">
            <div className="formInputContact">
              <h1>Modifica un produs</h1><br></br><br></br>
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
            <input
              type="text"
              name="pret"
              onChange={handleChange}
              placeholder="pret"
            /><br></br>
             <button onClick={handleClick}>Modifica</button>
      </form>
    </div>
    </div>
    </div>
  </div>
  </div>
    )
}

export default ModificaProduse