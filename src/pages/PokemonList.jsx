import { observer } from "mobx-react";
import React from "react";
import { Card } from "../components/Card";
import { Navigate } from "react-router-dom";
import Pagination from "../utils/Pagination";
import "./PokemonList.css";
import { PokemonInput } from "../components/PokemonInput";

import store from "../store/store";

const PokemonList = () => {
  if (store.selectedPokemon === undefined) {
    return <Navigate to="/" replace />;
  }

  const handlePageChange = (newPage) => {
    store.pokemon.page = newPage;
  };

  console.log(store);
  return (
    <div className="App">
      <PokemonInput />
      {store.filteredData.length > 0 ? (
        <div className="grid-main">
          {store.filteredData.map((pok) => {
            const pkmn = pok.images.small;
            return <Card pkmn={pkmn} key={pok.id} pok={pok} />;
          })}
        </div>
      ) : (
        <>
          <div className="grid-main">
            {store.pokemon.data.map((pok) => {
              const pkmn = pok.images.small;
              return <Card pkmn={pkmn} key={pok.id} pok={pok} />;
            })}
          </div>
          <Pagination
            totalCount={store.pokemon.totalCount}
            currentPage={store.pokemon.page}
            pageSize={30}
            onChangePage={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
export default observer(PokemonList);
