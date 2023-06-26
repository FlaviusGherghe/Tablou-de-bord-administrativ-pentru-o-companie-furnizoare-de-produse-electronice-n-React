import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./tabel.scss"
import data from "./mock-data.json"
import { nanoid } from 'nanoid';
import axios from "axios";
import img32 from "./images/upload.png"
import { Link } from "react-router-dom";

const Tabel = () => {
  const [file, setFile] = useState(null);
  // Declarare variabile
  const [tranzactii, setContacte] = useState([]);
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
        setContacte(res.data);
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
              <td><Link to={`/modificaTranzactii/${tranzactie.id}`} style={{ color: "inherit", textDecoration: "none" }}><button className="update">Modifica</button></Link>
                <button type="button" onClick={() => handleDelete(tranzactie.id)}>Sterge</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formular de adăugare produse */}
      <h2 className="versiunea1">Adauga o tranzactie</h2>
      <form >
        <input name="icon" type="file" onChange={(event) => setFile(event.target.files[0])} />
        <input type="text" name="produs" value={tranzactie.produs} onChange={handleChange} placeholder="Produs" />
        <input type="text" name="client" value={tranzactie.client} onChange={handleChange} placeholder="Client" />
        <input type="date" name="data" value={tranzactie.data} onChange={handleChange} placeholder="Data" />
        <input type="text" name="cantitate" value={tranzactie.cantitate} onChange={handleChange} placeholder="Cantitate" />
        <input type="text" name="plata" value={tranzactie.plata} onChange={handleChange} placeholder="Plata" />
        <input type="text" name="status" value={tranzactie.status} onChange={handleChange} placeholder="Status" />
        <button onClick={handleClick}>Adauga</button>
      </form>
    </div>
  );
};

export default Tabel;