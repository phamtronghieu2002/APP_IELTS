import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../fetures/userSlice'
import interfaceReducer from '../fetures/interfaceSlice'

export const store = configureStore({
  reducer: { user: userReducer, interface: interfaceReducer },
})
