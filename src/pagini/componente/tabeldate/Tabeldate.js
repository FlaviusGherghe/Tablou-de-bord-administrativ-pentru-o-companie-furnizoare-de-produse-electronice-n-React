import "./tabeldate.scss"
import data from "./utilizatori1.json";
import React, { useState, Fragment } from "react";
import { nanoid } from 'nanoid';
import { useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { set } from "date-fns";
import img13 from './images/search.png';

function Tabeldate() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    country: "",
    adress: "",
    phone: "",
  });

  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [search, setSearch] = useState("")

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/users/${userId}`, {
        ...user,
      });
      navigate("/postari");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const [error, setError] = useState(false)
  const [users, setUsers] = useState([]);
  const [nameList, setNameList] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/users/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUsers(res.data);
        const fetchedNames = res.data.map(user => user.name);
        setNameList(fetchedNames.join(", "));
      } catch (err) {
        console.log(err.response.data);
      }
    };
    fetchAllUsers();
  }, []);


  return (
    <div className="Tabeldate">
      <div className="cautare-container">
      <img className="icon" src={img13} alt=""/>
        <input name="cauta" type="text" placeholder="Cauta..." onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <div className="search-results">

    </div>
      <form >
        <div className="table-container">
        
          <table>
            <thead>
              <tr>
                <th ><span>Id</span></th>
                <th><span>Img</span></th>
                <th ><span>Username</span></th>
                <th><span>Email</span></th>
                <th><span>Nume</span></th>
                <th><span>Tara</span></th>
                <th><span>Adresa</span></th>
                <th><span>Telefon</span></th>
                <th><span>Actiuni</span></th>
              </tr>
            </thead>
            <tbody>
  {users
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td><img src={"http://localhost:8800//upload/" + user.profilePic} alt="" /></td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.name}</td>
        <td>{user.country}</td>
        <td>{user.adress}</td>
        <td>{user.phone}</td>
        <td>
          <button type="button" onClick={() => handleDelete(user.id)}>Sterge</button>
        </td>
      </tr>
    ))}
</tbody>
          </table>
        </div>
      </form>

     



    </div>

  );
}

export default Tabeldate;