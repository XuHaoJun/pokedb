export interface Generation {
  name: string
}

export interface Target {
  name: string
}

export interface Type {
  name: string
}

export interface Move {
  id: number
  name: string
  accuracy: number
  pp: number
  power: number
  priority: number
  generation: Generation
  target: Target
  type: Type
}
