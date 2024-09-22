import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from '../fetures/userSlice'
export const store = configureStore({
  reducer: { user: userReducer },
})
