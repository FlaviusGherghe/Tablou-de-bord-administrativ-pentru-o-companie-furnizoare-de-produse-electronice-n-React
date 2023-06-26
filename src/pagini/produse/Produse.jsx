import React from 'react'
import "./produse.scss"
import Sidebar from "../componente/sidebar/Sidebar"
import Navbar from "../componente/navbar/Navbar"
import TabelDateProduse from '../componente/tabeldate/TabelDateProduse'

const Produse = () => {
  return (
    <div className="produse"><Sidebar/>
    <div className="produseContainer"><Navbar/>
    <div className="produseTitlu">
          <h1>Produse</h1>
   <TabelDateProduse/></div>
    </div>
    </div>
  )
}

export default Produse