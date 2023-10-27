import { configureStore } from '@reduxjs/toolkit'
import commentsReducer from './commentsReducer'

export const store = configureStore({
  reducer: {
    comment: commentsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
