import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../componente/sidebar/Sidebar';
import Navbar from '../componente/navbar/Navbar';
import "./add.scss"
import img32 from "./images/upload.png"


const Add = () => {

  const [file, setFile] = useState(null);

  const [post, setPost] = useState({
    title: "",
    desc: "",
  });

  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  const handleClick = async (e) => {
    e.preventDefault();
    const docUrl = await upload();
    try {
      await axios.post("http://localhost:8800/posts",  {
        ...post,
    cover: file ? docUrl : "",
      });
      navigate("/postari")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='adaugaPostare'>
      <Sidebar />
      <div className="containerAdaugaPostari">
        <Navbar />
        <div className="adaugarePostari">
          <div className="formInputContact">
            <h1>Adauga o postare noua</h1><br></br><br></br>
            <div className="form">
              <label><h3>Titlu</h3></label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
              /><br></br>
              <label className="inputuri2"><h3>Imagine</h3><label htmlFor='file'><img  src={img32} alt="" className="icon" /></label></label>
              <input className='inputuri2' name="documente" type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/><br></br>
              <label><h3>Descriere</h3></label>
              <textarea
                rows={5}
                type="text"
                name="desc"
                onChange={handleChange}
              /><br></br>
              <button onClick={handleClick}>Adauga</button>
              {error && "Ceva nu a functionat!"} <br></br><br></br>
              <Link to="/postari">Vezi toate postarile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Add