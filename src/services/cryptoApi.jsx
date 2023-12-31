
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'f6e0a5aa69mshc46dda7833b2b7dp196391jsna943a328abd9',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url)=> ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (uuid)=> createRequest(`/coin/${uuid}`)
        }),
        getCryptoHistory: builder.query({
            query: ({uuid, timePeriod})=> createRequest(`/coin/${uuid}/history?timePeriod=${timePeriod}`)
        }),

    })
})
export const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi;
