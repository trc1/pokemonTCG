import React from "react";
import "./PokemonInput.css";

import store from "../store/store";

export const PokemonInput = () => {
  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    store.setFilter(filterValue);
    console.log(e.key);
    if (e.key === "Enter") {
      store.searchPokemon(filterValue);
    }
  };

  console.log(store.filter);
  return <input type="text" onKeyDown={handleFilterChange} />;
};
