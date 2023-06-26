import "./widget.scss"
import img21 from './images/up.png';
import img22 from './images/account.png';
import img23 from './images/cart.png';
import img24 from './images/earning.png';
import img25 from './images/balance.png';

const Widget = ({type}) => {
  let data;
// Conținut widget în funcție de type
  
const suma = 100;
const diferenta = 20;

switch(type){
  // Cazuri diferite bazate pe valoarea „type”
  case "utilizator":
    data={
      titlu:"UTILIZATORI",
      eBani: false,
      link:<a href="utilizatori" className="link">Vezi toti utilizatorii</a>,
      icon: ( <img className="icon" src={img22} width = "45" height = "35" alt="" />),
    };
    break;
    case "comanda":
    data={
      titlu:"COMENZI",
      eBani: false,
      link:<a href="comenzi" className="link">Vezi toate comenzile</a>,
      icon: (<img className="icon" src={img23} width = "45" height = "35"  alt="" />),
      
    };
    break;
    case "castig":
    data={
      titlu:"CASTIGURI",
      eBani: true,
      link:<a href="statistici" className="link">Vezi castigurile net</a>,
      icon: (<img className="icon" src={img24} width = "45" height = "35"  alt="" />),
      
    };
    break;
    case "sold":
    data={
      titlu:"SOLDURI",
      eBani: true,
      link:<a href="" className="link">Vezi detalii</a>,
      icon:( <img className="icon" src={img25} width = "45" height = "35"  alt="" />),
      
    };
    break;
    default:
      break;
}

  return (
    <div className = "widget">
    <div className = "stanga">
         {/* conținutul widget-ului redat pe baza obiectului „date*/}
    <span className="titlu">{data.titlu}</span>
    <span className="counter"> {suma} {data.eBani && "RON"} </span>
    <span className="link">{data.link}</span>
    </div>
    <div className = "dreapta">
    <div className="procent pozitiv"><img src={img21} width = "20" height = "20" alt=""/>
      {diferenta} %
    </div>
    {data.icon}
    </div>
    </div>
  )
}

export default Widget