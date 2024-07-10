import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../constants"
import type { ComboResponse } from "../types"

export const comboApi = createApi({
  reducerPath: "comboApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getCombo: builder.query<
      ComboResponse,
      { pageIndex?: number; pageSize?: number }
    >({
      query: ({ pageIndex = 1, pageSize = 10 }) => ({
        url: "/api/combinations",
        params: {
          pageIndex,
          pageSize,
        },
      }),
    }),
  }),
})

export const { useGetComboQuery } = comboApi
