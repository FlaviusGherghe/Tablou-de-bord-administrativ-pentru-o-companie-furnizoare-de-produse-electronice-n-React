import React, { useContext, useEffect, useState } from 'react'
import "./postari.scss"
import img20 from './images/avatar.jpg';
import sterge from './images/delete.png';
import edit from './images/edit.png';
import Sidebar from '../componente/sidebar/Sidebar';
import Navbar from '../componente/navbar/Navbar';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import img13 from './images/search.png';


const Postari = () => {

  const { currentUser } = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("")
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/posts");
        setPosts(res.data);
        const fetchedNames = res.data.map(post => post.title);
        setNameList(fetchedNames.join(", "));
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchAllPosts();
  }, []);


  console.log(posts);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/posts/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='postare'>
      <Sidebar />
      <div className="containerPostari">
        <Navbar />
        <div className="containermove">
          <div className="test">
            <span className="navigatiepostari">
              <div className="navig"><Link to="/postari">Noutate</Link> {'>'}  <Link to="/adaugaPostari" style={{ color: "black", textDecoration: "none" }}><button> Adauga o noutate </button></Link></div>
              <div className="fakeclass"></div>
            </span>
          </div>
          <div className="test3"> <div className="cautare-container">
          <img src={img13} alt="" />
        <input name="cauta" type="text" placeholder="Cauta..." onChange={(e)=>setSearch(e.target.value)}/>
     
      </div></div>
          <div className="test2">
            
            <div className="postari" >
               {/* Expresie JavaScript care iterează peste matricea postari și generează rânduri de tabel (<tr>) pe baza datelor.*/}
               {posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase())).map((post) => (
                <><div className="post" key={post.id}>
                  <br></br>
                  <div className="pozaprofil">
                    <img src={"http://localhost:8800//upload/" + currentUser.profilePic} alt="avatar" className='avatar' />
                    <h1>{post.title}</h1></div>
                  <div className="descriere"><p>{post.desc}</p>{post.cover && <img src={"http://localhost:8800//upload/" + post.cover} alt='' />}
                    <div className="scris">
                      <button className="delete" onClick={() => handleDelete(post.id)}>Sterge</button>
                      <Link to={`/modificaPostari/${post.id}`} style={{ color: "inherit", textDecoration: "none" }}><button className="update">Modifica</button></Link>
                    </div>
                  </div>
                </div>
                </>))}
            </div>
          </div>
          <br></br>
        </div>
      </div>
    </div>

  )
}


export default Postari