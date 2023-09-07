import { configureStore } from '@reduxjs/toolkit'
import { summarizeApi } from './article'

export const store = configureStore({
  reducer: {
    [summarizeApi.reducerPath]: summarizeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(summarizeApi.middleware),
})