import { BASE_URL } from "@/constants"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Bean, BeansResponse } from "../types"

export const beansApi = createApi({
  reducerPath: "beansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getBeans: builder.query<
      BeansResponse,
      {
        groupName?: string
        flavorName?: string
        colorGroup?: string
        glutenFree?: boolean
        sugarFree?: string
        seasonal?: boolean
        kosher?: boolean
        pageIndex?: number
        pageSize?: number
      }
    >({
      query: ({
        groupName,
        flavorName,
        colorGroup,
        glutenFree,
        sugarFree,
        seasonal,
        kosher,
        pageIndex = 1,
        pageSize = 10,
      }) => ({
        url: "/api/beans",
        params: {
          groupName,
          flavorName,
          colorGroup,
          glutenFree,
          sugarFree,
          seasonal,
          kosher,
          pageIndex,
          pageSize,
        },
      }),
    }),
    getBeanById: builder.query<Bean, number>({
      query: id => `/api/beans/${id}`,
    }),
  }),
})

export const { useGetBeansQuery, useGetBeanByIdQuery } = beansApi
