import { useState } from "react";

function SearchBar(props) {
  const [search, setSearch] = useState("");


  return (
    <div>
      <input
        className="input-searchBar"
        type="text"
        placeholder="Buscar"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          props.setValueToSearch(e.target.value);
        }}
      />
      {/* <input
        className="input-searchBar" 
        placeholder="Buscar por nº de comensales"
        type="text"
        value={search}
        onChange={(e)=>{
          setSearch(e.target.value);
          props.setValueComensales(e.target.value)
        }}
      /> */}
    </div>
  );
}

export default SearchBar;
