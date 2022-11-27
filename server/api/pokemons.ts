// let DATA: any = null
// const getData = async () => {
//   if (DATA) {
//     return DATA
//   } else {
// const xs = await $fetch(
// 'https://gistcdn.githack.com/XuHaoJun/f2ab7008101f5483821c93f80b85678f/raw/997b09b03b4ae28b9452074a8ff24ededc420485/pokemons.json'
// 'https://gist.github.com/XuHaoJun/f2ab7008101f5483821c93f80b85678f/raw/ed32191c148cbd4b7c63cebf4cba4b759d4cef87/pokemons.json'`${
// `http://localhost:${process.env.PORT ?? 3000}/pokemons.json`
// )
//     DATA = xs
//     return DATA
//   }
// }

export default defineEventHandler(async () => {
  return (await import('../assets/pokemons.json')).default
})
