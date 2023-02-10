import { useState, useEffect } from "react";

import axios from "axios";

interface Pokemon {
  id;
  name;
  url;
}

function App() {
  const [searchValue, setSearchValue] = useState();
  const [pokemon, setPokemon] = useState({} as Pokemon);

  const onTextChange = ({ target }) => setSearchValue(target.value);

  useEffect(() => {
    const getByPokemonName = async (pokeName) => {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}`
      );

      setPokemon({
        id: data.id,
        name: data.name,
        url: data.sprites.front_default,
      });
    };

    if (!searchValue) {
      getByPokemonName("ditto");
      return;
    }

    getByPokemonName(searchValue);
  }, [searchValue]);

  return (
    <div>
      <input
        type="text"
        placeholder="search a pokemon"
        value={searchValue}
        onChange={onTextChange}
      />

      <h1>{pokemon.id}</h1>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.url} alt="pokemon image" />
    </div>
  );
}

export default App;
