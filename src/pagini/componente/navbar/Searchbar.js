import React, { useState } from "react";
import img13 from './images/search.png';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

  };

  return (
    <div>
      <input
      className="cautare"
        type="text"
        placeholder="Cauta..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;