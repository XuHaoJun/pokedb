<template>
  <a-skeleton :paragraph="{ rows: 30 }" :title="false" :loading="isLoading" />
  <a-table :columns="columns" :data-source="data" :pagination="pagination">
    <template #headerCell="{ column }">
      <span> {{ column.name }} </span>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          <div class="flex flex-col justify-start items-center">
            <div>
              <img :src="record.sprites['front_default']" />
            </div>
            <div>
              {{ record.name }}
            </div>
          </div>
        </a>
      </template>
      <template v-else-if="column.key === 'types'">
        <span>
          <a-tag v-for="t in record.types" :key="t.type.name" :color="t.color">
            <span class="text-base">
              {{ t.type.name }}
            </span>
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'weakTypes'">
        <a-tag
          v-for="t in record.weakTypes"
          :key="t.name"
          :color="getTypeColor(t.name)"
        >
          <span class="text-base">
            {{ toRationString(t.ratio) }} * {{ t.name }}
          </span>
        </a-tag>
      </template>
      <template v-else-if="column.key === 'abilities'">
        <span>
          <a-tag
            v-for="a in record.abilities"
            :key="a.ability.name"
            :color="a.is_hidden ? 'pink' : undefined"
          >
            <span class="text-base">
              {{ a.ability.name }}
            </span>
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'hp'">
        {{ record.stats[0].base_stat }}
      </template>
      <template v-else-if="column.key === 'atk'">
        {{ record.stats[1].base_stat }}
      </template>
      <template v-else-if="column.key === 'def'">
        {{ record.stats[2].base_stat }}
      </template>
      <template v-else-if="column.key === 'satk'">
        {{ record.stats[3].base_stat }}
      </template>
      <template v-else-if="column.key === 'sdef'">
        {{ record.stats[4].base_stat }}
      </template>
      <template v-else-if="column.key === 'spd'">
        {{ record.stats[5].base_stat }}
      </template>
      <template v-else-if="column.key === 'moves'">
        <a-tag
          v-for="m in showMoreMoves[record.name]
            ? record.moves
            : record.previewMoves"
          :key="m.move.name"
          :color="m.color"
        >
          <span class="text-base">
            {{ m.move.name }}
          </span>
        </a-tag>
        <div>
          <v-btn variant="flat" @click="handleShowMoreMoves(record)"
            >Show {{ showMoreMoves[record.name] ? 'Less' : 'More' }}...</v-btn
          >
        </div>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
// import SmileOutlined from '@ant-design/icons-vue/SmileOutlined'
import * as _ from 'lodash-es'
import { rational } from '@ericrovell/rational'
import DownOutlined from '@ant-design/icons-vue/DownOutlined'
import { defineComponent, computed } from 'vue'
import type { Pokemon } from '~~/interfaces/pokemon.interface'
import { usePokemonStore } from '~~/stores/pokemon.store'

const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    name: 'Types',
    dataIndex: 'types',
    key: 'types',
  },
  {
    name: 'Weak Types',
    dataIndex: 'types',
    key: 'weakTypes',
  },
  {
    name: 'Abilities',
    dataIndex: 'abilities',
    key: 'abilities',
  },
  {
    name: 'Speed',
    dataIndex: 'stats.5.base_stat',
    key: 'spd',
    sorter: (a: Pokemon, b: Pokemon): number =>
      a.stats[5].base_stat - b.stats[5].base_stat,
  },
  {
    name: 'Hp',
    dataIndex: 'stats.0.base_stat',
    key: 'hp',
    sorter: (a: Pokemon, b: Pokemon): number =>
      a.stats[0].base_stat - b.stats[0].base_stat,
  },
  {
    name: 'Atk',
    dataIndex: 'stats.1.base_stat',
    key: 'atk',
    sorter: (a: Pokemon, b: Pokemon): number =>
      a.stats[1].base_stat - b.stats[1].base_stat,
  },
  {
    name: 'Def',
    dataIndex: 'stats.2.base_stat',
    key: 'def',
    sorter: (a: Pokemon, b: Pokemon): number =>
      a.stats[2].base_stat - b.stats[2].base_stat,
  },
  {
    name: 'Sp.Atk',
    dataIndex: 'stats.3.base_stat',
    key: 'satk',
    sorter: (a: Pokemon, b: Pokemon): number =>
      a.stats[3].base_stat - b.stats[3].base_stat,
  },
  {
    name: 'Sp.Def',
    dataIndex: 'stats.4.base_stat',
    key: 'sdef',
    sorter: (a: Pokemon, b: Pokemon): number =>
      a.stats[4].base_stat - b.stats[4].base_stat,
  },
  {
    name: 'Moves',
    dataIndex: 'moves',
    key: 'moves',
  },
]

function toRationString(n: number): string {
  if (n > 0 && n < 1) {
    return rational(n).toString()
  } else {
    return `${n}`
  }
}

function getTypeColor(typeName?: string): string {
  const mapping: Record<string, string> = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0',
  }
  return mapping[typeName || ''] || '#FAFAFA'
}

export default defineComponent({
  components: {
    // SmileOutlined,
    DownOutlined,
  },
  async setup() {
    const pokemonStore = usePokemonStore()
    if (process.server) {
      await Promise.all([
        pokemonStore.querys.pokemons.suspense(),
        pokemonStore.querys.moves.suspense(),
      ])
    }

    const showMoreMoves = reactive<Record<string, boolean>>({})
    function handleShowMoreMoves(pokemon: Pokemon) {
      showMoreMoves[pokemon.name] = !showMoreMoves[pokemon.name]
    }

    const data = computed(() => {
      const fullMoves = pokemonStore.moves.value || []
      const fullPokemons = pokemonStore.pokemons.value || []
      console.log('computed', !fullMoves.length || !fullPokemons.length)
      if (!fullMoves.length || !fullPokemons.length) {
        return []
      }
      return fullPokemons.map((x: Pokemon) => {
        const types = x.types.map((t: any) => {
          return {
            ...t,
            color: getTypeColor(t.type.name),
          }
        })
        const moves = x.moves.map((m) => {
          const fullMoveIdx = _.sortedIndexBy(fullMoves, m as any, (x) => x.id)
          const fullMove = fullMoves[fullMoveIdx]
          return {
            ...m,
            move: fullMove ?? m.move,
            color: getTypeColor(fullMove?.type.name),
          }
        })
        const previewMoves = _.take(moves, 10)
        return {
          ...x,
          types,
          moves,
          previewMoves,
        }
      })
    })

    const isLoading = pokemonStore.querys.pokemons.isLoading
    return {
      data,
      isLoading,
      columns,
      showMoreMoves,
      handleShowMoreMoves,
      getTypeColor,
      toRationString,
      pagination: {
        position: ['top', 'bottom'],
        defaultPageSize: 10,
        pageSizeOptions: ['10', '20', '30', '50', '100'],
      },
    }
  },
})
</script>
