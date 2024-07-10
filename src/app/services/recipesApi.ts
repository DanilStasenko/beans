import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../constants"
import type { RecipesResponse } from "../types"

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getRecipes: builder.query<
      RecipesResponse,
      { pageIndex?: number; pageSize?: number }
    >({
      query: ({ pageIndex = 1, pageSize = 10 }) => ({
        url: "/api/recipes",
        params: {
          pageIndex,
          pageSize,
        },
      }),
    }),
  }),
})

export const { useGetRecipesQuery } = recipesApi
