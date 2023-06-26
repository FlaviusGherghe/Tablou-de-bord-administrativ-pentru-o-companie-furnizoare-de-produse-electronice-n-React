import Sidebar from "../componente/sidebar/Sidebar"
import Navbar from "../componente/navbar/Navbar"
import "./acasa.scss"
import Widget from "../componente/widget/Widget"
import Grafic from "../componente/grafic/Grafic"
import Functii from "../componente/functii/Functii"
import Tabel from "../componente/tabel/Tabel"


const Acasa = () => {
  return (
    <div className="acasa">
      <Sidebar />
      <div className="acasaContainer">
        <Navbar />
        <div className="widgets">
      {/* Componente Widget  cu diferite props */}
          <Widget type="utilizator" />
          <Widget type="comanda" />
          <Widget type="castig" />
          <Widget type="sold" />
        </div>
        <div className="grafice">
          <Functii />
          <Grafic />
        </div>
        <div className="listaContainer">
          <div className="listaTitlu">Ultimele tranzactii</div>
          <Tabel />
        </div>
      </div>
    </div>
  )
}
export default Acasa