import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../fetures/userSlice'
import interfaceReducer from '../fetures/interfaceSlice'
import { interfaceSetting } from '../fetures/settingSlice'

export const store = configureStore({
  reducer: { user: userReducer, interface: interfaceReducer ,setting:interfaceSetting},
})
