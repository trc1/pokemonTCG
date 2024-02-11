import "./App.css";
import { PokeBall } from "./components/PokeBall";
import store from "./store/store";
import { observer } from "mobx-react";
import { Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import Pokemon from "./pages/Pokemon";

function App() {
  if (store.isLoading) {
    return <PokeBall />;
  }

  return (
    <Routes>
      <Route path="/">
        <Route index element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<Pokemon />}></Route>
      </Route>
    </Routes>
  );
}

export default observer(App);
