export interface Pagination {
  totalCount: number
  pageSize: number
  currentPage: number
  totalPages: number
}

export interface BeansResponse extends Pagination {
  items: Bean[]
}

export interface Bean {
  beanId: number
  groupName: string[]
  ingredients: string[]
  flavorName: string
  description: string
  colorGroup: string
  backgroundColor: string
  imageUrl: string
  glutenFree: boolean
  sugarFree: string
  seasonal: boolean
  kosher: boolean
}

export interface FactsResponse extends Pagination {
  items: Fact[]
}

export interface Fact {
  factId: number
  title: string
  description: string
}

export interface RecipesResponse extends Pagination {
  items: Recipe[]
}

export interface Recipe {
  recipeId: number
  name: string
  description: string
  imageUrl: string
  ingredients: string[]
  directions: string[]
}

export interface ComboResponse extends Pagination {
  items: Combo[]
}

export interface Combo {
  combinationId: number
  name: string
  tag: string[]
}
