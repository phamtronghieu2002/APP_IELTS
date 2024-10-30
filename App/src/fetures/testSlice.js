import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getData } from '../utils/asyncStore'



const initialState = {

     testResults : {},
}


export const interfaceTest = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setTestStore(state, action) {

            state.testResults = action.payload.testResults
  
        },     
    },
})

// Action creators are generated for each case reducer function
export const { setTestStore} = interfaceTest.actions

export default interfaceTest.reducer