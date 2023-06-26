import "./register.scss"
import Sidebar from "../componente/sidebar/Sidebar"
import Navbar from "../componente/navbar/Navbar"
import img31 from './images/noimage.png';
import img32 from './images/upload.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    country: "",
    adress: "",
    phone: "",
  });

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


  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

 const handleSubmit = async e => {
   e.preventDefault();
   const docUrl = await upload();
   try {
      await axios.post("/auth/register",{
          ...inputs,
      profilePic: file ? docUrl : "",
        });
        navigate("/login")
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="nou">
      <Sidebar/>
      <div className="containerNou">
        <Navbar/>
        <div className="sus">
          <h1>Inregistrare</h1>
        </div>
        <div className="up">
        <div className="jos">
          <div className="stanga"><img src={img31} alt="" /></div>
          <div className="dreapta"><form>
          <div className="formInput">
          <label className="documente">Imagine<label htmlFor='file'><img  src={img32} alt="" className="icon" /></label></label>
              <input className='inputuri2' name="profilePic" type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display:"none"}}  />
          </div>

            <div className="formInput">
            <label>Nume Utilizator</label>
            <input type="text" placeholder= "istroe6" required name="username"  onChange={handleChange}/>
          </div>

          <div className="formInput">
            <label>Nume si prenume</label>
            <input type="text" placeholder= "Stroe Ion" name="name" required  onChange={handleChange} />
          </div>

          <div className="formInput">
            <label>Email</label>
            <input type="email" placeholder= "ion.stroe@gmail.com" name="email" required  onChange={handleChange}/>
          </div>

          <div className="formInput">
            <label>Telefon</label>
            <input type="text" placeholder= "0744223355" name="phone"  onChange={handleChange} required   />
          </div>

          <div className="formInput">
            <label>Parola</label>
            <input type="password" required placeholder="Parola" name="password" onChange={handleChange}  />
          </div>

          <div className="formInput">
            <label>Adresa</label>
            <input type="text" placeholder= "Str.Rovinari nr.3 Iasi" name="adress"  onChange={handleChange} required />
          </div>

          <div className="formInput">
            <label>Tara</label>
            <input type="text" placeholder= "Romania" name="country"  onChange={handleChange} required />
          </div>
          </form>
          </div>
         
        </div>
        <div className="butonInregistare">
        <button onClick={handleSubmit}>Inregistreaza</button>
          {err && <p>{err}</p>}
        </div>
        <span className="intrebare"><p>Ai deja un cont ? </p><Link to="/login"><p>Login</p></Link></span>
        </div>
      </div>
    </div>
  )
}

export default Register