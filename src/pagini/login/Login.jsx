import "./login.scss"
import img40 from './images/welcome.png';
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import usernameIcon from './images/username.png';
import passwordIcon from './images/password.png';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const{login} = useContext(AuthContext);
  
  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

 const handleSubmit = async e => {
   e.preventDefault();
   try {
     await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  }; 

  return (
    <div className="validare">
      <h1 className="TitluValidare">Bine ai venit la AdminAssist</h1>
      <div className="directii">
        <div className="lastanga">
          <div className="poza">
          <img src={img40} alt="" className="welcome" width= "300px"/>
          </div>
        </div>
        <div className="mediana">
          <div className="linie"/>
        <div className="sau">AdminAssist</div>
        </div>
        <div className="ladreapta">
          <form className="ladreapta">
          <div className="usernamelogin"><img className="icon" src={usernameIcon} alt="" /><input type="text" placeholder="Introduceti utilizatorul" name="username"  onChange={handleChange} className="datelogare"  required /></div>
          <div className="passwordlogin"><img className="icon" src={passwordIcon} alt="" /> <input required type="password" placeholder="Introduceti parola" name="password" onChange={handleChange} className="datelogare"/></div>
          <button  onClick={handleSubmit} className="submit">Login</button>
          {err && <p>{err}</p>}
          <span className="intrebare"><p>Nu ai un cont ? </p><Link to="/register"><p>Înregistrare</p></Link></span>
          </form>
          
        </div>
      </div>
      </div>
      
  )
}

export default Login

