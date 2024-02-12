import { observer } from "mobx-react";
import React from "react";
import { CardComponent } from "../components/CardComponents";
import { Navigate, Link } from "react-router-dom";
import "./Pokemon.css";

import store from "../store/store";

function Pokemon() {
  const selectedPokemon =
    store.filteredData.find((pok) => pok.id === store.selectedPokemon) ||
    store.pokemon.data?.find((pok) => pok.id === store.selectedPokemon);
  console.log("selected pokemon", selectedPokemon);

  if (!store.selectedPokemon) {
    return <Navigate to="/" replace />;
  }

  return !selectedPokemon ? (
    "No pokemon info"
  ) : (
    <div className="grid">
      <CardComponent
        pkmn={selectedPokemon.images?.large}
        key={selectedPokemon.id}
        pok={selectedPokemon}
      />
      <div className="grid-right">
        <h1 className="header">{selectedPokemon.name}</h1>
        <p className="grid-right__id">{selectedPokemon.flavorText}</p>
        <p className="grid-right__id">Artist: {selectedPokemon.artist}</p>
        <p className="grid-right__id">HP: {selectedPokemon.hp}</p>
        <p className="grid-right__id">
          Retreat Cost: {selectedPokemon.convertedRetreatCost}
        </p>
        <p className="grid-right__id">Rarity: {selectedPokemon.rarity}</p>
        <p>Attacks:</p>
        <ul>
          {selectedPokemon.attacks?.map((att) => {
            return (
              <>
                <li>
                  {att.name} - {att.damage} damage
                </li>
                <span>{att.text}</span>
              </>
            );
          })}
        </ul>
        <a href={selectedPokemon.cardmarket?.url} target="_blank">
          Price
        </a>
                <Link to="/">
          <button
            onClick={() => {
              store.setSelectedPokemon(null);
            }}
          >
            Go to home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default observer(Pokemon);
