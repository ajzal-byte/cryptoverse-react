import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key": "ad2a1b4b72mshafbcdf3ab87db2dp1372c3jsn26920ffa9aa2",
  "X-RapidAPI-Host": "news67.p.rapidapi.com",
};

const baseUrl = "https://news67.p.rapidapi.com/v2";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", cryptoNewsHeaders["X-RapidAPI-Key"]);
      headers.set("X-RapidAPI-Host", cryptoNewsHeaders["X-RapidAPI-Host"]);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (count) => ({
        url: "/crypto",
        params: {
          languages: "en",
          batchSize: String(count),
        },
      }),
    }),
    getCryptoSearchNews: builder.query({
      query: (input) => ({
        url: "/topic-search",
        params: {
          languages: "en",
          search: String(input),
        },
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery, useGetCryptoSearchNewsQuery } = cryptoNewsApi;
