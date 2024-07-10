import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../constants"
import type { FactsResponse } from "../types"

export const factsApi = createApi({
  reducerPath: "factsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getFacts: builder.query<
      FactsResponse,
      { pageIndex?: number; pageSize?: number }
    >({
      query: ({ pageIndex = 1, pageSize = 10 }) => ({
        url: "/api/facts",
        params: {
          pageIndex,
          pageSize,
        },
      }),
    }),
  }),
})

export const { useGetFactsQuery } = factsApi
