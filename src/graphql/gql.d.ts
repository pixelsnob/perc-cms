interface IFindAllInput {
  offset: Number
  limit: number
  order: IOrderByInput[]
}

interface IQueryInput {
  query: any
  offset: Number
  limit: number
  order: IOrderByInput[]
}

interface IOrderByInput {
  column: string
  direction: string
}