import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = ref([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ])
  return { pokemons }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePokemonStore, import.meta.hot))
}
