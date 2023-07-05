import React, { useState } from "react";
import img13 from './images/search.png';
import { useNavigate } from "react-router-dom";
import "./searchbar.scss"

function SearchPage() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]); 
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
 
    const results = [
      { id: 1, title: 'statistici', page: '/statistici' },
      { id: 2, title: 'livrari', page: '/livrari' },
      { id: 3, title: 'comenzi', page: '/comenzi' },
      { id: 4, title: 'produse', page: '/produse' },
      { id: 5, title: 'sanatate', page: '/sanatate' },
      { id: 6, title: 'calendar', page: '/calendar' },
      { id: 7, title: 'contact', page: '/contact' },
      { id: 8, title: 'postari', page: '/postari' },
      { id: 9, title: 'setari', page: '/setari' },
      { id: 10, title: 'adaugaPostari', page: '/Add' },
      { id: 12, title: 'register', page: '/register' },
      { id: 13, title: 'utilizatori', page: '/utilizatori' },
    ];

  
    setSearchResults(results);

    const firstResult = results[0];

    navigate(firstResult.page);
  };

  return (
    <div  className="cautare2">
      <input
        type="text"
        placeholder="Cauta..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
         <img className="icon" onClick={handleSearch} src={img13} alt=""/>
       
    </div>
  );
}

export default SearchPage;