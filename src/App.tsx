import { useState } from 'react'
import './App.css'

interface Pokemon {
  name: string
  sprites: {
    front_default: string
  }
  types: {
    type: {
      name: string
    }
  }[]
  base_experience: number
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    setPokemon(undefined)
    setError(false)
    const formData = new FormData(event.target as HTMLFormElement)
    const pokemonName = formData.get("pokemonName")
    if (pokemonName) {
      setLoading(true)
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => setPokemon(data))
        .catch(() => setError(true))
        .finally(() => setLoading(false))
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>
          Enter pokemon name:
          <br />
          <input type="text" name="pokemonName" />
        </label>
        <button type="submit">Get info!</button>
      </form>
      {pokemon &&
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h1>{pokemon.name}</h1>
          <h2>Type(s): {pokemon.types.map((typeData) => typeData.type.name).join(" and ")}</h2>
          <p>Base experience: {pokemon.base_experience}</p>
        </div>
      }
      {loading &&
        <p>Loading...</p>
      }
      {error &&
        <p>Couldn't find your pokemon!</p>
      }
    </main>
  )
}

export default App