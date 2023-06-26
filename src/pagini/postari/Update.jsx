import React from 'react'
import "./update.scss"
import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../componente/sidebar/Sidebar';
import Navbar from '../componente/navbar/Navbar';
import img32 from "./images/upload.png"

const Update = () => {
  const [post, setPost] = useState({
    title: "",
    desc: "",
  });


  const [file, setFile] = useState(null);
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      await axios.put(`http://localhost:8800/posts/${postId}`,  {
        ...post,
    cover: file ? docUrl : "",
      });
      navigate("/postari");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className='adaugaModificare'>
    <Sidebar />
    <div className="containerModificaPostari">
      <Navbar />
      <div className="adaugareModificari">
        <div className="formInputContact">
          <h1>Modifica o postare</h1><br></br><br></br>
          <div className="form">
            <label><h3>Titlu</h3></label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
            /><br></br>
            <label><h3>Imagine</h3><label htmlFor='file'><img  src={img32} alt="" className="icon" /></label></label>
              <input className='inputuri2' name="cover" type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}/><br></br>
            <label><h3>Descriere</h3></label>
            <textarea
              rows={5}
              type="text"
              name="desc"
              onChange={handleChange}
            /><br></br>
            <button onClick={handleClick}>Modifica</button>
            {error && "Ceva nu a functionat!"} <br></br><br></br>
            <Link to="/postari">Vezi toate postarile</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};


export default Update