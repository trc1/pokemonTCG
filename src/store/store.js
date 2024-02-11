import { makeAutoObservable } from "mobx";
import PokemonApiServices from "../services/PokemonApiServices";

export const pokemonApi = new PokemonApiServices(
  "https://api.pokemontcg.io/v2"
);

class Store {
  pokemon = [];
  filter = "";
  filteredData = [];
  selectedPokemonInfo = {};
  selectedPokemon = null;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchPokemonData();
  }

  setPokemon = (pokemon) => {
    this.pokemon = pokemon;
  };

  setFilter = (filter) => {
    this.filter = filter;
  };

  setSelectedPokemon = (selectedPokemon) => {
    this.selectedPokemon = selectedPokemon;
  };

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setSelectedPokemonInfo = (selectedPokemonInfo) => {
    this.selectedPokemonInfo = selectedPokemonInfo;
  };

  fetchPokemonData = async () => {
    try {
      const pokemonList = await pokemonApi.fetchPokemonList();
      this.setPokemon(pokemonList);
      this.setIsLoading(false);
      console.log("Pokemon List:", pokemonList);

      const pokemonDetails = await pokemonApi.fetchPokemonDetails(
        this.selectedPokemon
      );
      if (this.selectedPokemon !== null) {
        this.setSelectedPokemon(pokemonDetails);
        console.log("Pokemon Details:", pokemonDetails);
      }
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };

  searchPokemon = async (name) => {
    try {
      this.setIsLoading(true); // Set loading to true before search operation

      const searchResult = await pokemonApi.searchPokemon(name);
      console.log("Search Result:", searchResult);
      this.filteredData = searchResult.data || []; // Update filteredData with search results

      this.setIsLoading(false); // Set loading to false after search operation
    } catch (error) {
      console.error("Error searching Pokemon:", error);
      this.setIsLoading(false); // Ensure loading state is set to false in case of error
    }
  };
}

const store = new Store();

/* pokemonApi.fetchPokemonList().then((pokemonList) => {
  store.setPokemon(pokemonList);
  store.setIsLoading(false);
  console.log("Pokemon List:", pokemonList);
});

pokemonApi.fetchPokemonByType(store.pokemonTypeList).then((pokemonFireList) => {
  console.log("Pokemon Fire List:", pokemonFireList);
});

pokemonApi.fetchPokemonDetails(store.selectedPokemon).then((pokemonDetails) => {
  if (store.selectedPokemon !== null) {
    store.setSelectedPokemon(pokemonDetails);
    console.log("Pokemon Details:", pokemonDetails);
  } else {
    return;
  }
}); */

export default store;
