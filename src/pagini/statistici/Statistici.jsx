import React from 'react'
import Sidebar from "../componente/sidebar/Sidebar"
import Navbar from "../componente/navbar/Navbar"
import Grafic3 from '../componente/grafic/Grafic3'
import   App2 from '../componente/grafic/Grafic2'
import "./statistici.scss"
import { App1 } from '../componente/grafic/Grafic1'
import App4 from '../componente/grafic/Grafic4'
const Statistici = () => {
  return (
    <div className="Statistici">
      <Sidebar/>
      <div className="containerStatistici">
        <Navbar/>
        <div className="totstatistici">
<div className="statistica1">
    <div className="grafic4"><App4/>
    </div>
    <div className="grafic2"><App2/>
    </div>
    </div>
    <div className='statistica2'>
    <div className='grafic3'><Grafic3/></div>

<div className="grafic1"><App1/></div></div>
</div>
    </div>
    </div>
  )
}

export default Statistici;
