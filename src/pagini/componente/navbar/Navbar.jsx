import "./navbar.scss"
import img13 from './images/search.png';
import img14 from './images/language.png';
import img15 from './images/light.png';
import img16 from './images/ecrancomplet.png';
import img17 from './images/notifications.png';
import img18 from './images/postari.png';
import img19 from './images/lista.png';
import img20 from './images/avatar.jpg';
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../../context/darkModeContext";
import {Link} from "react-router-dom"
import screenfull from "screenfull";
import {useRef} from 'react';
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import Searchbar from "./Searchbar"


const Navbar = () => {


  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const {dispatch} = useContext(DarkModeContext)
  const ref = useRef(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchAllPosts();
  }, []);
  
 
  const{ currentUser, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleClick = event => {

  if(screenfull.isEnabled) {
    screenfull.request();
     screenfull.exit();
    }
};
  const element = ref.current;

  element.addEventListener('click', handleClick);

return () => {
  element.removeEventListener('click', handleClick);
};
}, []);

  return (
    <div className="navbar">
    <div className="wrapper" id="myMenu">
      <div className="cautare">
       <Searchbar/>
      </div>
      <div className="obiecte">
        <div className="obiect"><img className="icon" src={img14} alt=""/>
        Romana
        </div>
        <div className="obiect"><img className="icon" src={img15} alt=""  onClick={(e) => dispatch({type:"TOGGLE"})}/>
        </div>
        <div className="obiect" ><img  ref={ref} id="ecranComplet" className="icon" src={img16} alt=""/>
        </div>
        <div className="obiect"> <Link to ="/postari" style={{textDecoration:"none", color:"inherit"}}><img className="icon" src={img18} alt=""/></Link>
        <div className="counter">2</div>
        </div>
        <div className="obiect"> <Link to ="/utilizatori/1" style={{textDecoration:"none", color:"inherit"}}> <img className="avatar" src={"http://localhost:8800//upload/" + currentUser.profilePic} alt=""/></Link>
        </div>
      </div>
    </div>
    </div>
    
    

  );
};


export default Navbar