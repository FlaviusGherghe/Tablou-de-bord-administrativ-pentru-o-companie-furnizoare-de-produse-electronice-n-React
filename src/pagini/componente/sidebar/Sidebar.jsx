import "./sidebar.scss"
import img0 from './images/logo.png';
import img1 from './images/dashboard.png';
import img2 from './images/users.png';
import img3 from './images/products.png';
import img4 from './images/orders.png';
import img5 from './images/delivery.png';
import img6 from './images/stats.png';
import img7 from './images/notifications.png';
import img8 from './images/health.png';
import img9 from './images/logs.png';
import img10 from './images/settings.png';
import img11 from './images/account.png';
import img12 from './images/logout.png';
import img13 from './images/calendar.png';
import img14 from './images/contact.png';
import tranzactii from './images/tranzactii.png';
import {Link} from "react-router-dom"
import { DarkModeContext } from "../../../context/darkModeContext";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext";


const Sidebar = () => {
  const{ currentUser, logout } = useContext(AuthContext);
  const {dispatch} = useContext(DarkModeContext);

  return (
    <div className="sidebar">
    <div className="sus"><Link  to ="/" style={{textDecoration:"none"}}><img src={img0} alt=""/><span className="logo"></span></Link>
    </div>
    <hr />
    <div className="centru">
    <ul>
      <p className="titlu">Principal</p>
      <Link to ="/" style={{textDecoration:"none", color:"inherit" }} ><li><img className="icon" src={img1} alt=""/><span>Dashboard</span></li></Link>
        <p className="titlu">Liste</p>
        <Link to ="/utilizatori" style={{textDecoration:"none", color:"inherit" }} ><li><img className="icon" src={img2} alt="" /><span>Utilizatori</span></li></Link>
        <Link to ="/produse" style={{textDecoration:"none", color:"inherit"}}><li><img className="icon" src={img3} alt="" /><span>Produse</span></li></Link>
        <Link to ="/comenzi" style={{textDecoration:"none", color:"inherit"}}> <li><img className="icon" src={img4} alt="" /><span>Comenzi</span></li></Link>
        <Link to ="/livrari" style={{textDecoration:"none", color:"inherit"}}> <li><img className="icon" src={img5} alt="" /><span>Livrari</span></li></Link>
        <p className="titlu">Folositor</p>
        <Link to ="/statistici" style={{textDecoration:"none", color:"inherit"}}> <li><img className="icon" src={img6} alt="" /><span>Statistici</span></li></Link>
        <Link to ="/calendar" style={{textDecoration:"none", color:"inherit"}}> <li><img className="icon" src={img13} alt="" /><span>Calendar</span></li></Link>
        <p className="titlu">Servicii</p>
        <Link to ="/sanatate" style={{textDecoration:"none", color:"inherit"}}> <li><img className="icon" src={img8} alt="" /><span>Sanatate</span></li></Link>
        <Link to ="/setari" style={{textDecoration:"none", color:"inherit"}}> <li><img className="icon" src={img10} alt="" /><span>Setari</span></li></Link>
        <Link to ="/contact" style={{textDecoration:"none", color:"inherit"}}> <li><img className="icon" src={img14} alt="" /><span>Contact</span></li></Link>
        <p className="titlu">Utilizator</p>
        <Link to ="/utilizatori/1" style={{textDecoration:"none", color:"inherit"}}> <li><img className="icon" src={img11} alt=""/><span>Profil</span></li></Link>
        <li>
  <img className="icon" src={img12} alt="" />
  {currentUser ? (
   <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}><span onClick={logout}>Logout</span></Link>
  ) : (
    <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
     <span>Login</span>
    </Link>
  )}
</li>
    </ul>
    </div>
    <div className="jos">
      <div className="OptiuniCulori" onClick={() => dispatch({type:"LIGHT"})}></div>
      <div className="OptiuniCulori" onClick={() => dispatch({type:"DARK"})}></div>
    </div>
    </div>
  )
}

export default Sidebar