class PokemonApiServices {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

  async fetchData(endpoint, queryParams = {}) {
    const urlWithParams = new URL(this.url + endpoint);

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== null) {
        urlWithParams.searchParams.append(key, value);
      }
    });

    const pendingData = await fetch(urlWithParams.toString());
    const fetchedData = await pendingData.json();

    return fetchedData;
  }

  async fetchPokemonList(page = 1, pageSize = 30) {
    const queryParams = { page, pageSize };
    return this.fetchData("/cards", queryParams);
  }

  async fetchPokemonDetails(pokemonId) {
    return this.fetchData(`/cards/${pokemonId}`);
  }

  async searchPokemon(name) {
    const queryParams = { q: `name:${name}` };
    return this.fetchData("/cards", queryParams);
  }

  // Additional methods for creating, updating, and deleting resources can be added here.
}

export default PokemonApiServices;
