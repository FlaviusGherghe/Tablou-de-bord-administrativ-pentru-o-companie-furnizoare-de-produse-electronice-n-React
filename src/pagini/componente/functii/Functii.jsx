import "./functii.scss";
import img26 from './images/punctulete.png';
import { CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import img27 from './images/up.png';
import img28 from './images/down.png';

const Functii = () => {
  return (
    <div className="functii">
    <div className="sus">
<h1 className="titlu">Venit Total</h1>
<img className="icon" src={img26} width = "25" height = "25" alt="" />
      </div>

    <div className="jos">
    <div className="functiiGrafic">
    <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
    </div>
    <p className="titlu">Total vanzari azi</p>
    <p className="suma">450 RON</p>
    <p className="descrescator">Tranzactiile anterioare se proceseaza. Este posibil ca ultimile plati sa nu fie incluse.
    </p>
    <div className="rezumat">
      <div className="obiect">
        <div className="obiectTitlu">Acum o luna</div>
        <div className="obiectRezultat negativ"><img src={img28} width = "20" height = "20" alt=""/>
        <div className="rezultatCantitate">1.400 RON</div>
</div>
      </div>
      <div className="obiect">
        <div className="obiectTitlu">Ieri</div>
        <div className="obiectRezultat pozitiv"><img src={img27} width = "20" height = "20" alt=""/>
        <div className="rezultatCantitate">5.900 RON</div>
</div>

      </div>
      <div className="obiect">
        <div className="obiectTitlu">Saptamana trecuta</div>
        <div className="obiectRezultat pozitiv"><img src={img27} width = "20" height = "20" alt=""/>
        <div className="rezultatCantitate">12.400 RON</div>
</div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Functii