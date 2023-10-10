import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// yahoofinance api
const newsHeaders = {
    'X-RapidAPI-Key': 'f6e0a5aa69mshc46dda7833b2b7dp196391jsna943a328abd9',
    'X-RapidAPI-Host': 'yahoo-finance127.p.rapidapi.com'
}
const baseUrl = 'https://yahoo-finance127.p.rapidapi.com'


const createRequest = (url)=> ({url, headers: newsHeaders})

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({
        baseUrl, newsHeaders
    }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: (ticker)=> createRequest(`news/${ticker}`)
        })
    })
})
export const { useGetNewsQuery } = newsApi;