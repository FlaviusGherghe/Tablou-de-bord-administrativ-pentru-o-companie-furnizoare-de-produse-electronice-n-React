import "./lista.scss"
import Sidebar from "../componente/sidebar/Sidebar"
import Navbar from "../componente/navbar/Navbar"
import Tabeldate from "../componente/tabeldate/Tabeldate"
const Lista = () => {
  return (
    <div className="lista"><Sidebar/>
    <div className="listaContainer"><Navbar/>
    <div className="tabeldate"><Tabeldate/></div>
    </div>
    </div>
  )
}

export default Lista