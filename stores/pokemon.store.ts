import { useQuery } from '@tanstack/vue-query'
import { Move } from '~~/interfaces/move.interface'
import { Pokemon } from '~~/interfaces/pokemon.interface'

const usePokemonsQuery = () => {
  return useQuery(
    ['pokemons'],
    () => $fetch<Pokemon[]>('/api/pokemons'),
    // async () => (await import('./pokemons.json')).default,
    {
      // staleTime: Infinity,
      staleTime: 30 * 60 * 1000,
    }
  )
}

const useMovesQuery = () => {
  return useQuery(['moves'], () => $fetch<Move[]>('/api/moves'), {
    staleTime: 30 * 60 * 1000,
  })
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
