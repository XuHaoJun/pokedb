import { useQuery } from '@tanstack/vue-query'
import { acceptHMRUpdate, defineStore } from 'pinia'

const usePokemonQuery = () => {
  return useQuery(
    ['pokemon'],
    async () => (await import('./pokemons.json')).default
  )
}

export const usePokemonStore = defineStore('pokemon', () => {
  const query = usePokemonQuery()
  return { pokemons: query.data, query }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePokemonStore, import.meta.hot))
}
