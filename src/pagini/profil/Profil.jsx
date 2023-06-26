import "./profil.scss"
import Sidebar from "../componente/sidebar/Sidebar"
import Navbar from "../componente/navbar/Navbar"
import img30 from './images/utilizator2.png';
import Grafic2 from "./Grafic2";
import Tabel from "../componente/tabel/Tabel"
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";


const Paginasingura = () => {

  const{ currentUser, logout } = useContext(AuthContext);

  return (
    <div className="singura"><Sidebar/>
    <div className="singurContainer"><Navbar/>
      <div className="sus">
      <div className="stanga">
        <div className="ButonEdit">Modifica</div>
      <h1 className="titlu">Informatii</h1>
      <div className="obiect">
      <img src={"http://localhost:8800//upload/" + currentUser.profilePic} alt="" className="obiectImage" />
      <div className="detalii">
        <h1 className="obiectTitlu">{currentUser.name}</h1>
        <div className="detaliiObiect">
        <span className="obiectKey">Email:</span>
        <span className="detaliiValoarea">{currentUser.email}</span>
        </div>
        <div className="detaliiObiect">
        <span className="obiectKey">Telefon:</span>
        <span className="detaliiValoarea">{currentUser.phone}</span>
        </div>
        <div className="detaliiObiect">
        <span className="obiectKey">Adresa:</span>
        <span className="detaliiValoarea">{currentUser.adress}</span>
        </div>
        <div className="detaliiObiect">
        <span className="obiectKey">Tara:</span>
        <span className="detaliiValoarea">{currentUser.country}</span>
        </div>
      </div>
      </div>
      </div>
      <div className="dreapta">
        <Grafic2></Grafic2>
      </div>
    </div>
    <div className="buton">
    <h1 className="titlu">Ultimile tranzactii</h1>
      <Tabel></Tabel>
    </div>
    </div>
    </div>
    
  )
}

export default Paginasingura