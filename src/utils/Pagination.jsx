import React, { useState, useEffect } from "react";
import PokemonApiServices from "../services/PokemonApiServices";
import store from "../store/store";
import "./Pagination.css";

const pokemonApi = new PokemonApiServices("https://api.pokemontcg.io/v2");

const Pagination = ({ totalCount, currentPage, pageSize, onChangePage }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState("");

  useEffect(() => {
    const calculatedTotalPages = Math.ceil(totalCount / pageSize);
    setTotalPages(calculatedTotalPages || 1);
  }, [totalCount, pageSize]);

  const handlePageChange = async (newPage) => {
    store.setIsLoading(true);
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      try {
        const pokemonList = await pokemonApi.fetchPokemonList(
          newPage,
          pageSize
        );

        store.setPokemon(pokemonList);
        console.log("Pokemon List:", pokemonList);

        onChangePage(newPage);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        store.setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const newPage = parseInt(inputPage);
      if (!isNaN(newPage)) {
        handlePageChange(newPage);
        setInputPage("");
      }
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const minPage = Math.max(1, currentPage - 2);
    const maxPage = Math.min(totalPages, currentPage + 2);

    for (let i = minPage; i <= maxPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={i === currentPage ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };
  return (
    <div className="pagination">
      <ul>
        <li onClick={() => handlePageChange(currentPage - 1)}>Prev</li>
        {renderPageNumbers()}
        <li onClick={() => handlePageChange(currentPage + 1)}>Next</li>
      </ul>
      <div>
        <input
          type="text"
          value={inputPage}
          onChange={(e) => {
            const inputValue = parseInt(e.target.value);
            setInputPage(
              isNaN(inputValue)
                ? 1
                : inputValue > totalPages
                ? totalPages
                : inputValue
            );
          }}
          onKeyDown={handleKeyPress}
          placeholder="Enter page number..."
        />
        <span>
          Total page number: {currentPage}/{totalPages}
        </span>
      </div>
    </div>
  );
};

export default Pagination;
