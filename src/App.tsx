import { useState, useEffect, useCallback, useRef } from "react";

import axios from "axios";

interface Pokemon {
  id;
  name;
  url;
}

function App() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const debouncedGetPokemon = useRef<number>()
  
  const searchPokemon = useCallback(pokemon => {
    clearTimeout(debouncedGetPokemon.current)

    debouncedGetPokemon.current = setTimeout(async () => {
      if (!pokemon) return

      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const { id, name, sprites } = data
  
        setPokemon({
          id,
          name,
          url: sprites.front_default
        }) 
      } catch (error) { }
    }, 1000)
  }, [])

  const hanldeTextChange = (event) => setSearchValue(event.target.value)

  useEffect(() => searchPokemon(searchValue), [searchValue]);

  return (
    <div>
      <input
        type="text"
        placeholder="search a pokemon"
        value={searchValue}
        onChange={hanldeTextChange}
      />

      <h1>{pokemon.id}</h1>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.url} alt="pokemon image" />
    </div>
  );
}

export default App;