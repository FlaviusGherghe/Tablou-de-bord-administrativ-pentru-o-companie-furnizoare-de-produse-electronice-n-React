import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./tabel.scss"
import axios from "axios";
import img32 from "./images/upload.png"
import { Link } from "react-router-dom";

const Tabel = () => {
  const [file, setFile] = useState(null);
  // Declarare variabile
  const [tranzactii, setTranzactii] = useState([]);
  const [tranzactie, setTranzactie] = useState({

    produs: "",
    client: "",
    data: "",
    cantitate: "",
    plata: "",
    status: "",
  });

  const navigate = useNavigate();



  const handleChange = (e) => {
    setTranzactie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  //Metoda Fetch
  useEffect(() => {
    const fetchAllTranzactii = async () => {
      try {
        const res = await axios.get("http://localhost:8800/tranzactii");
        setTranzactii(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchAllTranzactii();
  }, []);


  const handleClick = async (event) => {
    event.preventDefault();
    const docUrl = await upload();
    try {
      const res = await axios.post("http://localhost:8800/tranzactii", {
        icon: file ? docUrl : "",
        ...tranzactie,

      });
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/tranzactii/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="tabel">
      <table>
        {/* Tabel header */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Img</th>
            <th>Produs</th>
            <th>Client</th>
            <th>Data</th>
            <th>Cantitate</th>
            <th>Metoda de plata</th>
            <th>Status</th>
            <th>Actiuni</th>
          </tr>
        </thead>

        {/* Tabel body */}
        <tbody>

          {tranzactii.map((tranzactie) => (
            <tr key={tranzactie.id}>
              <td>{tranzactie.id}</td>
              <td><img src={"http://localhost:8800//upload/" + tranzactie.icon} alt="" /></td>
              <td>{tranzactie.produs}</td>
              <td>{tranzactie.client}</td>
              <td>{tranzactie.data}</td>
              <td>{tranzactie.cantitate}</td>
              <td>{tranzactie.plata}</td>
              <td>{tranzactie.status}</td>
              <td><div className="butoane"><Link to={`/modificaTranzactii/${tranzactie.id}`} style={{ color: "inherit", textDecoration: "none" }}><button className="update">Modifica</button></Link>
                <button type="button" onClick={() => handleDelete(tranzactie.id)}>Sterge</button></div></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formular de adăugare produse */}
      <h2 className="versiunea1">Adauga o tranzactie</h2>
      <form className="jos" >
      <label className="icon"><label htmlFor='file'><img  src={img32} alt="" className="icon" /></label></label>
              <input className='inputuri2' name="icon" type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}  />
        <input type="text" name="produs" value={tranzactie.produs} onChange={handleChange} placeholder="Produs" />
        <input type="text" name="client" value={tranzactie.client} onChange={handleChange} placeholder="Client" />
        <input type="date" name="data" value={tranzactie.data} onChange={handleChange} placeholder="Data" />
        <input type="text" name="cantitate" value={tranzactie.cantitate} onChange={handleChange} placeholder="Cantitate" />
        <select name="plata" value={tranzactie.plata} id="plata" onChange={handleChange}>
              <option value="card">Card</option>
              <option value="ramburs">Ramburs</option>
              <option value="rate">Rate</option>
            </select>
            <select name="status" value={tranzactie.status} id="status" onChange={handleChange}>
              <option value="inasteptare">In asteptare</option>
              <option value="esuata">Esuata</option>
              <option value="efectuata">Efectuata</option>
            </select>
       <div className="butoane"><button  onClick={handleClick}>Adauga</button></div>
      </form>
    </div>
  );
};

export default Tabel;