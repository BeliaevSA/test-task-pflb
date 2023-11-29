import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/'
  }),
  endpoints: builder => ({
    getProducts: builder.query({
      query: ({category, sort, order, page}) => `${category}?_sort=${sort}&_order=${order}&_limit=${3 * page}`
    }),
    getPagination: builder.query({
      query: ({category, page}) => `${category}?_page=${page + 2}&_limit=3`
    })
  })
})

export const { useGetProductsQuery, useGetPaginationQuery } = api