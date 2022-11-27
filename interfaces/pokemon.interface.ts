export interface Ability2 {
  name: string
}

export interface Ability {
  ability: Ability2
  is_hidden: boolean
  slot: number
}

export interface Stat2 {
  name: string
}

export interface Stat {
  base_stat: number
  stat: Stat2
}

export interface Type2 {
  name: string
}

export interface Type {
  slot: number
  type: Type2
}

export interface OfficialArtwork {
  front_default: string
}

export interface Other {
  'official-artwork': OfficialArtwork
}

export interface Sprites {
  front_default: string
  other: Other
}

export interface Move2 {
  name: string
}

export interface Move {
  move: Move2
}

export interface Pokemon {
  id: number
  name: string
  abilities: Ability[]
  stats: Stat[]
  types: Type[]
  sprites: Sprites
  moves: Move[]
}
