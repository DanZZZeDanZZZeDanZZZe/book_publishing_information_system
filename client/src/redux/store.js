import { configureStore } from '@reduxjs/toolkit'

import authenticationReducer from './authenticationSlice'
import entityReducer from './entitySlice'

const store = configureStore({
  reducer: {
    authenticationReducer,
    entityReducer,
  },
})

export default store
