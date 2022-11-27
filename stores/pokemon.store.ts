import { useQuery } from '@tanstack/vue-query'
import { Move } from '~~/interfaces/move.interface'
import { Pokemon } from '~~/interfaces/pokemon.interface'

const usePokemonsQuery = () => {
  return useQuery(
    ['pokemons'],
    () =>
      $fetch<Pokemon[]>(
        'https://gistcdn.githack.com/XuHaoJun/f2ab7008101f5483821c93f80b85678f/raw/997b09b03b4ae28b9452074a8ff24ededc420485/pokemons.json'
      ),
    // async () => (await import('./pokemons.json')).default,
    {
      // staleTime: Infinity,
      staleTime: 30 * 60 * 1000,
    }
  )
}

const useMovesQuery = () => {
  return useQuery(
    ['moves'],
    () =>
      $fetch<Move[]>(
        'https://gistcdn.githack.com/XuHaoJun/f2ab7008101f5483821c93f80b85678f/raw/ed32191c148cbd4b7c63cebf4cba4b759d4cef87/moves.json'
      ),
    {
      staleTime: 30 * 60 * 1000,
    }
  )
}

// export const usePokemonStore = defineStore('pokemon', () => {
//   const query = usePokemonsQuery()
//   return { pokemons: query.data, query, isLoading: query.isLoading }
// })
export const usePokemonStore = () => {
  const querys = {
    pokemons: usePokemonsQuery(),
    moves: useMovesQuery(),
  }
  return { pokemons: querys.pokemons.data, moves: querys.moves.data, querys }
}

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(usePokemonStore, import.meta.hot))
// }
