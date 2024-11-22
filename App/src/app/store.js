import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../fetures/userSlice'
import interfaceReducer from '../fetures/interfaceSlice'
import interfaceSetting from '../fetures/settingSlice'
import testReducer from '../fetures/testSlice'
import examReducer from '../fetures/examSlice'
export const store = configureStore({
  reducer: { user: userReducer, interface: interfaceReducer, setting: interfaceSetting, test: testReducer ,exam:examReducer},
})
