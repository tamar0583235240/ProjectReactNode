import { configureStore } from '@reduxjs/toolkit'
import { api } from './api' // הנתיב לקובץ שבו מוגדר ה-RTK Query slice
import apiSliceCookies from './apiSliceCookies'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [apiSliceCookies.reducerPath]: apiSliceCookies.reducer,
    // הוסף כאן רידיוסרים אחרים אם יש לך
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

// סוגים:
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
