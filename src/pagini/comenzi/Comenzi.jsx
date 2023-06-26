import React from 'react'
import "./comenzi.scss"
import Sidebar from "../componente/sidebar/Sidebar"
import Navbar from "../componente/navbar/Navbar"
import TabelDateComenzi from '../componente/tabeldate/TabelDateComenzi'

const Comenzi = () => {
  return (
    <div className="comenzi"><Sidebar/>
    <div className="comenziContainer"><Navbar/>
    <div className="comenziTitlu"><h1>Comenzi</h1> <TabelDateComenzi/>   </div>
    </div>
    </div>
  )
}

export default Comenzi