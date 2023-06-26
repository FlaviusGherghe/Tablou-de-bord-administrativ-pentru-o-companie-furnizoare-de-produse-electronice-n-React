import React from 'react'
import Sidebar from '../componente/sidebar/Sidebar'
import Navbar from '../componente/navbar/Navbar'
import TabelDateLivrari from '../componente/tabeldate/TabelDateLivrari'
import "./livrari.scss"

const Livrari = () => {
  return (
    <div className='livrari'><Sidebar/>
    <div className="livrariContainer"><Navbar/>
    <div className="livrariTitlu"><h1>Livrari</h1>
   <TabelDateLivrari/></div>
    </div>
    </div>
   

  )
}

export default Livrari