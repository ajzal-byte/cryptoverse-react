import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "ad2a1b4b72mshafbcdf3ab87db2dp1372c3jsn26920ffa9aa2",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", cryptoApiHeaders["X-RapidAPI-Key"]);
      headers.set("X-RapidAPI-Host", cryptoApiHeaders["X-RapidAPI-Host"]);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => "/coins",
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
