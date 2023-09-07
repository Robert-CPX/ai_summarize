import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export interface Summary {
  summary: string;
}

type SummaryResponse = Summary

export const summarizeApi = createApi({
  reducerPath: 'summarizeApi',
  baseQuery: fetchBaseQuery({ 
      baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
      prepareHeaders: (headers) => {
        headers.set("X-RapidAPI-Key", apiKey);
        headers.set("X-RapidAPI-Host", "article-extractor-and-summarizer.p.rapidapi.com");
        return headers;
      }
    }),
  endpoints: (builder) => ({
    getSummary: builder.query<SummaryResponse,string>({
      query: (articleUrl) => `summarize?url=${encodeURIComponent(articleUrl)}&length=3`,
    })
  }),
})

export const { useLazyGetSummaryQuery } = summarizeApi